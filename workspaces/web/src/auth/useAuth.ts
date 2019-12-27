import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { assertDefined } from "../common/assertDefined"

type AuthState =
  | { type: "loading" }
  | { type: "error"; error: string }
  | {
      type: "authenticated"
      user: AuthUser
      token: string
      client: Auth0Client
    }
  | { type: "anonymous"; client: Auth0Client }

export type AuthUser = {
  name: string
  picture: string
}

const redirectUri =
  process.env.REACT_APP_AUTH0_REDIRECT_URI ||
  "http://localhost:3000/auth/callback"

export function useAuth() {
  const [state, setState] = useState<AuthState>({ type: "loading" })
  const history = useHistory()

  useEffect(() => {
    async function getAuthState(): Promise<AuthState> {
      let client: Auth0Client | undefined
      try {
        client = await createAuth0Client({
          domain: assertDefined(process.env.REACT_APP_AUTH0_DOMAIN),
          client_id: assertDefined(process.env.REACT_APP_AUTH0_CLIENT_ID),
          redirect_uri: redirectUri,
          audience: assertDefined(process.env.REACT_APP_AUTH0_AUDIENCE),
        })
      } catch (error) {
        console.error(error)
        return { type: "error", error: "could not create auth client" }
      }

      let authCallbackUrl: URL
      try {
        authCallbackUrl = new URL(redirectUri)
      } catch (error) {
        console.error(error)
        return { type: "error", error: "could not initialize auth state" }
      }

      try {
        if (history.location.pathname.startsWith(authCallbackUrl.pathname)) {
          const result = await client.handleRedirectCallback()
          history.replace(result.appState.path ?? "/")
        }

        const user = await client.getUser()
        const token = await client.getTokenSilently()

        return user
          ? { type: "authenticated", user, token, client }
          : { type: "anonymous", client }
      } catch (error) {
        console.warn("error during auth init:", error)
        return { type: "anonymous", client }
      }
    }

    getAuthState().then(setState)
  }, [history])

  return state
}
