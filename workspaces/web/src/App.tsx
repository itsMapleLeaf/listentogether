import React from "react"
import { useAuth } from "./auth/useAuth"

function App() {
  const [state, actions] = useAuth()

  switch (state.type) {
    case "loading":
      return <p>loading...</p>

    case "anonymous":
      return <button onClick={actions.login}>log in</button>

    case "authenticated":
      return (
        <>
          <code>{JSON.stringify(state.user)}</code>
          <button onClick={actions.logout}>log out</button>
        </>
      )
  }
}

export default App
