import { useMemo } from "react"
import createContextWrapper from "../common/createContextWrapper"
import { firebase } from "../firebase"

function useAuthClient() {
  return useMemo(
    () => ({
      login() {
        const provider = new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithPopup(provider)
      },
      logout() {
        firebase.auth().signOut()
      },
    }),
    [],
  )
}

export const useAuthClientContext = createContextWrapper(useAuthClient)
export const AuthClientProvider = useAuthClientContext.Provider
