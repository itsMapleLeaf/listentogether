import { createBrowserHistory } from "history"
import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import RoomPage from "../room/RoomPage"
import { SocketStore } from "../socket/SocketStore"
import { AppStore } from "./AppStore"
import LobbyPage from "./LobbyPage"

function App() {
  const history = useMemo(() => createBrowserHistory(), [])

  const socketStore = useMemo(() => new SocketStore(), [])

  const appStore = useMemo(() => new AppStore(socketStore, history), [
    socketStore,
    history,
  ])

  useEffect(() => socketStore.openConnection(), [socketStore])
  useEffect(() => appStore.addSocketListener(), [appStore])
  useEffect(() => appStore.initRouting(), [appStore])

  switch (socketStore.connectionState) {
    case "connecting":
      return <p>connecting...</p>

    case "reconnecting":
      return <p>lost connection, reconnecting...</p>

    case "online":
      switch (appStore.view.type) {
        case "lobby":
          return (
            <LobbyPage onCreateRoom={appStore.createRoom} loading={false} />
          )

        case "room":
          return (
            <RoomPage slug={appStore.view.slug} socketStore={socketStore} />
          )
      }
  }
}

export default observer(App)
