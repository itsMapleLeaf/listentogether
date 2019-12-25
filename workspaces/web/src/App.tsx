import React from "react"
import { useAuth } from "./auth"

function App() {
  const [state, actions] = useAuth()
  return (
    <main>
      {state.type === "loading" ? (
        <p>loading...</p>
      ) : state.type === "anonymous" ? (
        <button onClick={actions.login}>log in</button>
      ) : state.type === "authenticated" ? (
        <>
          <code>{JSON.stringify(state.user)}</code>
          <button onClick={actions.logout}>log out</button>
        </>
      ) : null}
    </main>
  )
}

export default App
