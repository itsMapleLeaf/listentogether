import {
  ClientCommand,
  createBroadcast,
  createSendCommand,
  parseCommand,
  ServerCommand,
} from '@listen-together/shared'
import compression from 'compression'
import cors from 'cors'
import { GraphQLServer } from 'graphql-yoga'
import WebSocket from 'ws'
import { checkJwt } from './auth'
import { photon } from './photon'
import { createRoomHandler } from './room'
import { schema } from './schema'

async function startHttpServer() {
  const server = new GraphQLServer({ schema })

  server.express.use(cors({ origin: 'http://localhost:3000' }))
  server.express.use(compression())

  server.express.post('/api/rooms', checkJwt, createRoomHandler)

  const port = Number(process.env.PORT) || 4000
  await server.start({ port })
  console.log(`API listening on http://localhost:${port}`)
}

function startSocketServer() {
  const port = Number(process.env.SOCKET_PORT) || 5000
  const server = new WebSocket.Server({ port })

  const broadcast = createBroadcast<ServerCommand>(() => server.clients)

  server.on('connection', (socket, request) => {
    console.log(`new client ${request.connection.remoteAddress}`)

    const sendCommand = createSendCommand<ServerCommand>(() => socket)
    let clientRoomSlug: string | undefined

    socket.on('message', async data => {
      const message = parseCommand<ClientCommand>(data)

      switch (message.type) {
        case 'client-set-slug': {
          clientRoomSlug = message.roomSlug
          break
        }

        case 'client-request-tracks': {
          const room = photon.rooms.findOne({
            where: { slug: clientRoomSlug },
          })

          const tracks = await room.tracks()
          sendCommand({ type: 'server-update-tracks', tracks })
          break
        }

        case 'client-add-track': {
          const { youtubeUrl } = message

          const room = photon.rooms.update({
            where: { slug: clientRoomSlug },
            data: {
              tracks: {
                create: {
                  title: youtubeUrl,
                  youtubeUrl,
                },
              },
            },
          })

          const tracks = await room.tracks()
          broadcast({ type: 'server-update-tracks', tracks })

          break
        }
      }
    })

    socket.on('close', () => {
      console.log('closed')
    })
  })

  server.on('error', () => {})
}

startHttpServer().catch(console.error)
startSocketServer()
