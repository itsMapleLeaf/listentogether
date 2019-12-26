import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthUser } from "../auth/useAuth"
import { createApi } from "../network/api"
import { routes } from "./routes"

type Props = {
  user: AuthUser
  token: string
  onLogout: () => void
}

function HomePage({ user, token, onLogout }: Props) {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const api = createApi(token)

  const createRoom = async () => {
    setLoading(true)
    try {
      const { roomId } = await api.createRoom()
      history.push(routes.room(roomId))
    } catch (error) {
      setLoading(false)
    }
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

export default HomePage
