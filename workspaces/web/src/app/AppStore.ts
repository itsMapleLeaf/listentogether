import { observable } from "mobx"
import { createMessageHandler } from "../socket/createMessageHandler"

const socketUrl = `ws://localhost:4000/api/socket`

type ConnectionState = "connecting" | "online" | "reconnecting"

type AppView = { type: "lobby" } | { type: "room"; slug: string }

export class AppStore {
  // history = createBrowserHistory()

  @observable
  connectionState: ConnectionState = "connecting"

  @observable
  view: AppView = { type: "lobby" }

  private socket?: WebSocket

  connect = () => {
    const socket = (this.socket = new WebSocket(socketUrl))

    socket.onopen = () => {
      this.connectionState = "online"
    }

    socket.onclose = () => {
      this.connectionState = "reconnecting"
      this.removeHandlers()
      setTimeout(this.connect, 1000)
    }

    socket.onerror = () => {
      this.connectionState = "reconnecting"
      this.removeHandlers()
      setTimeout(this.connect, 1000)
    }

    socket.onmessage = ({ data }) => {
      const message = JSON.parse(String(data))
      this.handleMessage(message)
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

  private removeHandlers = () => {
    if (!this.socket) return
    this.socket.onopen = null
    this.socket.onclose = null
    this.socket.onerror = null
    this.socket.onmessage = null
  }
}
