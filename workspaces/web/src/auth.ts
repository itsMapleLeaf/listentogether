import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useEffect, useMemo, useState } from "react"

type AuthState =
  | { type: "loading" }
  | { type: "authenticated"; user: any; token: string }
  | { type: "anonymous" }

export function useAuth() {
  const [state, setState] = useState<AuthState>({ type: "loading" })
  const [client, setClient] = useState<Auth0Client>()

  useEffect(() => {
    async function createClient() {
      const client = await createAuth0Client({
        domain: "kingdaro.auth0.com",
        client_id: "tD5PbNq3BlwfPSLhuAbV6DGvaON7Q6F1",
        redirect_uri: "http://localhost:3000/auth/callback",
      })

      if (window.location.pathname.startsWith(`/auth/callback`)) {
        await client.handleRedirectCallback()
        window.history.replaceState(undefined, document.title, "/")
      }

      const user = await client.getUser()
      const token = await client.getTokenSilently()

      setClient(client)
      if (user) {
        setState({ type: "authenticated", user, token })
      } else {
        setState({ type: "anonymous" })
      }
    }

    createClient()
  }, [])

  const actions = useMemo(
    () => ({
      login() {
        client?.loginWithRedirect()
      },
      logout() {
        client?.logout()
      },
    }),
    [client],
  )

  return [state, actions] as const
}
