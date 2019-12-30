import React from "react"
import { useSocket } from "./useSocket"

function App() {
  const state = useSocket()

  switch (state.type) {
    case "connecting":
      return <p>connecting...</p>

    case "online":
      return <p>online!</p>

    case "reconnecting":
      return <p>lost connection, reconnecting...</p>
  }
}

export default App
