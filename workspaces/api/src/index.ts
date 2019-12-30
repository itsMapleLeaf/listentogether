import compression from "compression"
import cors from "cors"
import express from "express"
import http from "http"
import WebSocket from "ws"
import { photon } from "./photon"
import { addYouTubeTrackToRoom, getOrCreateRoom } from "./room"

class Client {
  readonly id = Math.random().toString()

  constructor(private readonly socket: WebSocket) {}

  send(message: { type: string; params?: object }) {
    this.socket.send(JSON.stringify(message))
  }
}

const clients = new Map<string, Client>()

function broadcast(message: { type: string; params?: object }) {
  for (const [, client] of clients) {
    client.send(message)
  }
}

function handleClientConnection(
  clientSocket: WebSocket,
  request: http.IncomingMessage,
) {
  const clientAddress = request.connection.remoteAddress
  console.info(`connected: ${clientAddress}`)

  const client = new Client(clientSocket)
  clients.set(client.id, client)

  clientSocket.on("message", (data) => {
    const message = JSON.parse(String(data))
    console.log(message)
    handleClientMessage(message, client)
  })

  clientSocket.on("close", () => {
    console.info(`closed: ${clientAddress}`)
  })
}

async function handleClientMessage(message: any, client: Client) {
  type HandlerMap = {
    [_ in string]?: (params: any) => void | Promise<void>
  }

  const handlers: HandlerMap = {
    async clientCreateRoom() {
      const room = await getOrCreateRoom(client.id)
      client.send({
        type: "serverRoomCreated",
        params: { roomSlug: room.slug },
      })
    },

    async clientRequestTracks({ roomSlug }) {
      const tracks = await photon.rooms
        .findOne({ where: { slug: roomSlug } })
        .tracks()

      client.send({
        type: "serverUpdateTracks",
        params: { tracks },
      })
    },

    async clientAddTrack({ roomSlug, youtubeUrl }) {
      await addYouTubeTrackToRoom(roomSlug, youtubeUrl)

      const tracks = await photon.rooms
        .findOne({ where: { slug: roomSlug } })
        .tracks()

      broadcast({
        type: "serverUpdateTracks",
        params: { tracks },
      })
    },
  }

  await handlers[message.type]?.(message.params)
}

const app = express()
app.use(cors({ origin: "http://localhost:3000" }))
app.use(compression())

const httpServer = new http.Server(app)

const socketServer = new WebSocket.Server({
  server: httpServer,
  path: "/api/socket",
})

socketServer.on("connection", handleClientConnection)

const port = Number(process.env.PORT) || 4000
httpServer.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
