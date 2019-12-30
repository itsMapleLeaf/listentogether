import { SocketMessage } from "@listen-together/shared"
import WebSocket from "ws"

export class Client {
  readonly id = Math.random().toString()

  constructor(private readonly socket: WebSocket) {}

  send(message: SocketMessage) {
    this.socket.send(JSON.stringify(message))
  }
}
