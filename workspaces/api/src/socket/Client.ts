import { serializeMessage, SocketMessage } from "@listen-together/shared"
import WebSocket from "ws"

export class Client {
  readonly id = Math.random().toString()
  isAlive = true
  roomSlug?: string

  constructor(private readonly socket: WebSocket) {}

  send(message: SocketMessage) {
    this.socket.send(serializeMessage(message))
  }

  ping() {
    this.socket.ping()
  }

  terminate() {
    this.socket.terminate()
  }
}
