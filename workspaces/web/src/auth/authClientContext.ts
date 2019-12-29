import firebase from "firebase"
import { useMemo } from "react"
import createContextWrapper from "../common/createContextWrapper"
import { firebaseApp } from "../firebase"

function useAuthClient() {
  return useMemo(
    () => ({
      login() {
        const provider = new firebase.auth.TwitterAuthProvider()
        firebaseApp.auth().signInWithPopup(provider)
      },
      logout() {
        firebaseApp.auth().signOut()
      },
    }),
    [],
  )
}

export const useAuthClientContext = createContextWrapper(useAuthClient)
export const AuthClientProvider = useAuthClientContext.Provider
