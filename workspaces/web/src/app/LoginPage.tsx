import React from "react"
import { useAuthClientContext } from "../auth/authClientContext"

export default function LoginPage() {
  const client = useAuthClientContext()
  return <button onClick={client.login}>log in</button>
}
