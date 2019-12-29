import { useEffect, useState } from "react"
import { firebase } from "../firebase"

type AuthState =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "authenticated"; user: AuthUser }
  | { type: "anonymous" }

export type AuthUser = firebase.User

export function useAuth() {
  const [state, setState] = useState<AuthState>({ type: "loading" })

  useEffect(() => {
    const handleUser = (user: firebase.User | null): void => {
      setState(user ? { type: "authenticated", user } : { type: "anonymous" })
    }

    const handleError = (error: firebase.auth.Error) => {
      setState({ type: "error", error: error.message })
    }

    return firebase.auth().onAuthStateChanged(handleUser, handleError)
  }, [])

  return state
}
