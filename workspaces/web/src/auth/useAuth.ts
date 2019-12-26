import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

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

export function useAuth() {
  const [state, setState] = useState<AuthState>({ type: "loading" })
  const history = useHistory()

  useEffect(() => {
    async function getAuthState(): Promise<AuthState> {
      let client: Auth0Client | undefined
      try {
        client = await createAuth0Client({
          domain: "kingdaro.auth0.com",
          client_id: "tD5PbNq3BlwfPSLhuAbV6DGvaON7Q6F1",
          redirect_uri: "http://localhost:3000/auth/callback",
          audience: "https://api.listentogether.com",
        })
      } catch (error) {
        return { type: "error", error: "could not create auth client" }
      }

      try {
        if (history.location.pathname.startsWith(`/auth/callback`)) {
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
