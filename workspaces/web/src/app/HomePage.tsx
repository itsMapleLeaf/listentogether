import React from "react"
import { useHistory } from "react-router-dom"
import { useAuthClientContext } from "../auth/authClientContext"
import { useAuthUserContext } from "../auth/authUserContext"
import { useAsync } from "../state/useAsync"
import { routes } from "./routes"
import { useApi } from "./useApi"

function HomePage() {
  const [{ loading, error }, run] = useAsync()
  const history = useHistory()
  const user = useAuthUserContext()
  const client = useAuthClientContext()
  const api = useApi()

  const createRoom = async () => {
    const { slug } = await run(api.createRoom())
    history.push(routes.room(slug))
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
      {error && <p>{error}</p>}
    </main>
  )
}

export default HomePage
