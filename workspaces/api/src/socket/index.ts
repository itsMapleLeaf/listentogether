import {
  createMessageHandler,
  deserializeMessage,
  SocketMessage,
} from "@listen-together/shared"
import http from "http"
import WebSocket from "ws"
import { photon } from "../photon"
import { addYouTubeTrackToRoom, getOrCreateRoom } from "../room"
import { Client } from "./Client"

const clients = new Map<string, Client>()

function broadcastToRoom(slug: string, message: SocketMessage) {
  for (const [, client] of clients) {
    if (client.roomSlug === slug) client.send(message)
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
    const message = deserializeMessage(data)
    console.log(message)
    handleClientMessage(client)(message)
  })

  clientSocket.on("close", () => {
    console.info(`closed: ${clientAddress}`)
    clients.delete(client.id)
  })

  clientSocket.on("pong", () => {
    client.isAlive = true
  })
}

const handleClientMessage = (client: Client) =>
  createMessageHandler({
    async clientCreateRoom() {
      const { slug } = await getOrCreateRoom(client.id)
      client.send({
        type: "serverRoomCreated",
        params: { slug },
      })
    },

    async clientJoinRoom({ slug }) {
      client.roomSlug = slug
      client.send(await createUpdateTracksMessage(slug))
    },

    async clientAddTrack({ youtubeUrl }) {
      const { roomSlug } = client
      if (!roomSlug) return

      await addYouTubeTrackToRoom(roomSlug, youtubeUrl)
      broadcastToRoom(roomSlug, await createUpdateTracksMessage(roomSlug))
    },
  })

async function createUpdateTracksMessage(
  roomSlug: string,
): Promise<SocketMessage> {
  const tracks = await photon.rooms
    .findOne({ where: { slug: roomSlug } })
    .tracks()

  return {
    type: "serverUpdateTracks",
    params: {
      tracks: tracks.map((track) => ({
        ...track,
        youtubeUrl: track.youtubeUrl || "",
      })),
    },
  }
}

// clients might have disconnected even without a close event
// https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
function checkDeadClients() {
  for (const [id, client] of clients) {
    if (!client.isAlive) {
      client.terminate()
      clients.delete(id)
      continue
    }

    client.isAlive = false
    client.ping()
  }
}

export function createSocketServer(httpServer: http.Server) {
  const socketServer = new WebSocket.Server({
    server: httpServer,
    path: "/api/socket",
  })

  socketServer.on("connection", handleClientConnection)
  setInterval(checkDeadClients, 10000)
}
