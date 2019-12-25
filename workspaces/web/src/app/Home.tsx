import React from "react"
import { AuthUser } from "../auth/useAuth"
import { createApi } from "../network/api"

type Props = { user: AuthUser; token: string; onLogout: () => void }

function Home({ user, token, onLogout }: Props) {
  const api = createApi(token)

  const createRoom = async () => {
    await api.createRoom()
    // redirect to room url
  }

  return (
    <main>
      <p>hi, {user.name}! what would you like to do?</p>
      <button onClick={createRoom}>create room</button>
      <button onClick={onLogout}>log out</button>
    </main>
  )
}

export default Home
