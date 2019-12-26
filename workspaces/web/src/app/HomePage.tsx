import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuthClientContext } from "../auth/authClientContext"
import { useAuthUserContext } from "../auth/authUserContext"
import { routes } from "./routes"
import { useApi } from "./useApi"

function HomePage() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const user = useAuthUserContext()
  const client = useAuthClientContext()
  const api = useApi()

  const createRoom = async () => {
    setLoading(true)
    try {
      const { slug } = await api.createRoom()
      history.push(routes.room(slug))
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
