import WebSocket from "ws"

export class Client {
  readonly id = Math.random().toString()

  constructor(private readonly socket: WebSocket) {}

  send(message: { type: string; params?: object }) {
    this.socket.send(JSON.stringify(message))
  }
}
