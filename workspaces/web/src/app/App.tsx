import React, { useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import RoomPage from "../room/RoomPage"
import LobbyPage from "./LobbyPage"
import { routes } from "./routes"
import { useSocket } from "./useSocket"

type HandlerMap = {
  [_ in string]?: (params: any) => void | Promise<void>
}

function createMessageHandler(handlers: HandlerMap) {
  return async function handleMessage(message: any) {
    await handlers[message.type]?.(message.params)
  }
}

type AppState = { type: "idle" } | { type: "creatingRoom" }

function App() {
  const history = useHistory()
  const [appState, setAppState] = useState<AppState>({ type: "idle" })

  const [socketState, sendCommand] = useSocket(
    createMessageHandler({
      async serverRoomCreated({ roomSlug }) {
        history.push(routes.room(roomSlug))
        setAppState({ type: "idle" })
      },
    }),
  )

  const handleCreateRoom = () => {
    if (appState.type === "idle") {
      sendCommand({ type: "clientCreateRoom" })
      setAppState({ type: "creatingRoom" })
    }
  }

  switch (socketState.type) {
    case "connecting":
      return <p>connecting...</p>

    case "reconnecting":
      return <p>lost connection, reconnecting...</p>

    case "online":
      return (
        <Switch>
          <Route exact path={routes.lobby}>
            <LobbyPage
              onCreateRoom={handleCreateRoom}
              disabled={appState.type === "creatingRoom"}
            />
          </Route>
          <Route
            path={routes.room(":slug")}
            render={({ match }) => <RoomPage slug={match.params.slug} />}
          />
        </Switch>
      )
  }
}

export default App
