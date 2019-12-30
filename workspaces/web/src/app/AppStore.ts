import { createBrowserHistory } from "history"
import { autorun, observable } from "mobx"
import { createRouter } from "../common/createRouter"
import { createMessageHandler } from "../socket/createMessageHandler"

type ConnectionState = "connecting" | "online" | "reconnecting"

type AppView = { type: "lobby" } | { type: "room"; slug: string }

const socketUrl = `ws://localhost:4000/api/socket`
const history = createBrowserHistory()

export class AppStore {
  @observable
  connectionState: ConnectionState = "connecting"

  @observable
  view: AppView = { type: "lobby" }

  private socket?: WebSocket

  // TODO: find a better system for this
  initRouting = () => {
    const router = createRouter<AppView>({
      "/room/:slug": ({ slug }) => ({ type: "room", slug }),
      "/": () => ({ type: "lobby" }),
    })

    this.view = router.run(history.location.pathname) ?? { type: "lobby" }

    const unlistenHistory = history.listen((location) => {
      this.view = router.run(location.pathname) ?? { type: "lobby" }
    })

    const cleanupAutorun = autorun(() => {
      const path = this.view.type === "lobby" ? "/" : `/room/${this.view.slug}`
      if (path !== history.location.pathname) {
        history.push(path)
      }
    })

    return () => {
      unlistenHistory()
      cleanupAutorun()
    }
  }

  openSocketConnection = () => {
    const socket = (this.socket = new WebSocket(socketUrl))

    socket.onopen = () => {
      this.connectionState = "online"
    }

    socket.onclose = () => {
      this.connectionState = "reconnecting"
      removeSocketListeners()
      setTimeout(this.openSocketConnection, 1000)
    }

    socket.onerror = () => {
      this.connectionState = "reconnecting"
      removeSocketListeners()
      setTimeout(this.openSocketConnection, 1000)
    }

    socket.onmessage = ({ data }) => {
      const message = JSON.parse(String(data))
      this.handleMessage(message)
    }

    const removeSocketListeners = () => {
      socket.onopen = null
      socket.onclose = null
      socket.onerror = null
      socket.onmessage = null
    }

    return () => {
      removeSocketListeners()
      socket.close()
    }
  }

  createRoom = () => {
    if (this.view.type === "lobby") {
      this.sendMessage({ type: "clientCreateRoom" })
    }
  }

  private sendMessage = (message: { type: string; params?: any }) => {
    this.socket?.send(JSON.stringify(message))
  }

  private handleMessage = createMessageHandler({
    serverRoomCreated: async ({ roomSlug }) => {
      if (this.view.type === "lobby") {
        this.view = { type: "room", slug: roomSlug }
      }
    },
  })
}
