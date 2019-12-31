import { createBrowserHistory } from "history"
import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { AuthStore } from "../auth/AuthStore"
import RoomPage from "../room/RoomPage"
import { SocketStore } from "../socket/SocketStore"
import SolidButton from "../ui/SolidButton"
import { AppStore } from "./AppStore"
import LobbyPage from "./LobbyPage"

function App() {
  const history = useMemo(() => createBrowserHistory(), [])

  const socketStore = useMemo(() => new SocketStore(), [])

  const authStore = useMemo(() => new AuthStore(history), [history])

  const appStore = useMemo(() => new AppStore(socketStore, history), [
    socketStore,
    history,
  ])

  useEffect(() => socketStore.openConnection(), [socketStore])
  useEffect(() => void authStore.getAuthStatus(), [authStore])
  useEffect(() => appStore.addSocketListener(), [appStore])
  useEffect(() => appStore.initRouting(), [appStore])

  switch (authStore.status.type) {
    case "loading":
      return <p>authenticating...</p>

    case "error":
      return <p>an error occurred: {authStore.status.error}</p>

    case "anonymous":
      return <SolidButton onClick={authStore.login}>log in</SolidButton>

    case "authenticated":
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
}

export default observer(App)
