import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { useMemo } from "react"
import { useHistory } from "react-router-dom"
import createContextWrapper from "../common/createContextWrapper"

type UseAuthClientOptions = {
  client: Auth0Client
}

function useAuthClient({ client }: UseAuthClientOptions) {
  const history = useHistory()
  return useMemo(
    () => ({
      login() {
        client.loginWithRedirect({
          appState: { path: history.location.pathname },
        })
      },
      logout() {
        client.logout()
      },
      getToken(): Promise<string> {
        return client.getTokenSilently()
      },
    }),
    [client, history.location.pathname],
  )
}

export const useAuthClientContext = createContextWrapper(useAuthClient)
export const AuthClientProvider = useAuthClientContext.Provider
