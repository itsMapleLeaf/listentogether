import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuthClientContext } from "../auth/authClientContext"
import { useAuthUserContext } from "../auth/authUserContext"
import { useApi } from "./useApi"
import { routes } from "./routes"

function HomePage() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const user = useAuthUserContext()
  const client = useAuthClientContext()
  const api = useApi()

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
      <button disabled={loading} onClick={client.logout}>
        log out
      </button>
    </main>
  )
}

export default HomePage
