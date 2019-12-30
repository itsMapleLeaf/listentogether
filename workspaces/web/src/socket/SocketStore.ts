import { SocketMessage } from "@listen-together/shared"
import { observable } from "mobx"

type ConnectionState = "connecting" | "online" | "reconnecting"

const socketUrl = `ws://localhost:4000/api/socket`

export class SocketStore {
  @observable
  connectionState: ConnectionState = "connecting"

  private socket?: WebSocket

  openConnection = () => {
    const socket = (this.socket = new WebSocket(socketUrl))

    socket.onopen = () => {
      this.connectionState = "online"
    }

    socket.onclose = () => {
      this.connectionState = "reconnecting"
      removeSocketListeners()
      setTimeout(this.openConnection, 3000)
    }

    socket.onerror = () => {
      this.connectionState = "reconnecting"
      removeSocketListeners()
      setTimeout(this.openConnection, 3000)
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

  listen = (handleMessage: (message: SocketMessage) => void) => {
    const listener = ({ data }: MessageEvent) =>
      handleMessage(JSON.parse(String(data)))

    this.socket?.addEventListener("message", listener)
    return () => this.socket?.removeEventListener("message", listener)
  }

  send = (message: SocketMessage) => {
    this.socket?.send(JSON.stringify(message))
  }
}
