import React, { useState } from "react"
import { AuthUser } from "../auth/useAuth"
import { createApi } from "../network/api"

type Props = { user: AuthUser; token: string; onLogout: () => void }

function Home({ user, token, onLogout }: Props) {
  const [loading, setLoading] = useState(false)
  const api = createApi(token)

  const createRoom = async () => {
    setLoading(true)
    console.log(await api.createRoom())
    setLoading(false)
    // redirect to room url
  }

  return (
    <main>
      <p>hi, {user.name}! what would you like to do?</p>
      <button disabled={loading} onClick={createRoom}>
        create room
      </button>
      <button disabled={loading} onClick={onLogout}>
        log out
      </button>
    </main>
  )
}

export default Home
