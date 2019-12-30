import { createMessageHandler, SocketMessage } from "@listen-together/shared"
import { Track as DatabaseTrack } from "@prisma/photon"
import http from "http"
import WebSocket from "ws"
import { photon } from "../photon"
import { addYouTubeTrackToRoom, getOrCreateRoom } from "../room"
import { Client } from "./Client"

const clients = new Map<string, Client>()

function broadcast(message: SocketMessage) {
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
    handleClientMessage(client)(message)
  })

  clientSocket.on("close", () => {
    console.info(`closed: ${clientAddress}`)
    clients.delete(client.id)
  })
}

const handleClientMessage = (client: Client) =>
  createMessageHandler({
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

      client.send(createUpdateTracksMessage(roomSlug, tracks))
    },

    async clientAddTrack({ roomSlug, youtubeUrl }) {
      await addYouTubeTrackToRoom(roomSlug, youtubeUrl)

      const tracks = await photon.rooms
        .findOne({ where: { slug: roomSlug } })
        .tracks()

      broadcast(createUpdateTracksMessage(roomSlug, tracks))
    },
  })

function createUpdateTracksMessage(
  roomSlug: any,
  tracks: DatabaseTrack[],
): SocketMessage {
  return {
    type: "serverUpdateTracks",
    params: {
      roomSlug,
      tracks: tracks.map((track) => ({
        ...track,
        youtubeUrl: track.youtubeUrl || "",
      })),
    },
  }
}

export function createSocketServer(httpServer: http.Server) {
  const socketServer = new WebSocket.Server({
    server: httpServer,
    path: "/api/socket",
  })

  socketServer.on("connection", handleClientConnection)
}
