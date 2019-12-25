import React from "react"
import { useAuth } from "../auth/useAuth"
import Home from "./Home"

function App() {
  const [state, actions] = useAuth()

  switch (state.type) {
    case "loading":
      return <p>loading...</p>

    case "error":
      return <p>oops! an error occurred: {state.error}</p>

    case "anonymous":
      return <button onClick={actions.login}>log in</button>

    case "authenticated":
      return <Home {...state} onLogout={actions.logout} />
  }
}

export default App
