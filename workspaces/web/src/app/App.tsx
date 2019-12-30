import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import RoomPage from "../room/RoomPage"
import { AppStore } from "./AppStore"
import LobbyPage from "./LobbyPage"

function App() {
  const store = useMemo(() => new AppStore(), [])

  useEffect(() => store.openSocketConnection(), [store])
  useEffect(() => store.initRouting(), [store])

  switch (store.connectionState) {
    case "connecting":
      return <p>connecting...</p>

    case "reconnecting":
      return <p>lost connection, reconnecting...</p>

    case "online":
      switch (store.view.type) {
        case "lobby":
          return <LobbyPage onCreateRoom={store.createRoom} disabled={false} />

        case "room":
          return <RoomPage slug={store.view.slug} />
      }
  }
}

export default observer(App)
