import React from "react"
import { AuthUser } from "../auth/useAuth"

type Props = { user: AuthUser; onLogout: () => void }

function Landing({ user, onLogout }: Props) {
  return (
    <main>
      <p>hi, {user.name}! what would you like to do?</p>
      <button>create room</button>
      <button onClick={onLogout}>log out</button>
    </main>
  )
}

export default Landing
