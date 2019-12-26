import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import { pwrap } from "../common/pwrap"

type AuthState =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "authenticated"; user: AuthUser; token: string }
  | { type: "anonymous" }

export type AuthUser = {
  name: string
  picture: string
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({ type: "loading" })
  const [client, setClient] = useState<Auth0Client>()
  const history = useHistory()

  useEffect(() => {
    async function createClient() {
      const [client, clientError] = await pwrap(
        createAuth0Client({
          domain: "kingdaro.auth0.com",
          client_id: "tD5PbNq3BlwfPSLhuAbV6DGvaON7Q6F1",
          redirect_uri: "http://localhost:3000/auth/callback",
          audience: "https://api.listentogether.com",
        }),
      )

      if (!client) console.error(clientError)
      return client
    }

    async function getAuthState(client: Auth0Client) {
      try {
        if (history.location.pathname.startsWith(`/auth/callback`)) {
          const result = await client.handleRedirectCallback()
          history.replace(result.appState.path ?? "/")
        }

        const user = await client.getUser()
        const token = await client.getTokenSilently()

        setState(
          user ? { type: "authenticated", user, token } : { type: "anonymous" },
        )
      } catch (error) {
        console.warn("error during auth init:", error)
        setState({ type: "anonymous" })
      }
    }

    createClient().then((client) => {
      setClient(client)
      if (client) {
        getAuthState(client)
      }
    })
  }, [history])

  const actions = useMemo(
    () => ({
      login() {
        client?.loginWithRedirect({
          appState: { path: history.location.pathname },
        })
      },
      logout() {
        client?.logout()
      },
    }),
    [client, history.location.pathname],
  )

  return [state, actions] as const
}
