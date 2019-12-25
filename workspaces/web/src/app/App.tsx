import React from "react"
import { useAuth } from "../auth/useAuth"
import Landing from "./Landing"

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
      return <Landing user={state.user} onLogout={actions.logout} />
  }
}

export default App
