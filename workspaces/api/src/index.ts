import compression from 'compression'
import cors from 'cors'
import { GraphQLServer } from 'graphql-yoga'
import { checkJwt } from './auth'
import { createRoomHandler } from './room'
import { schema } from './schema'

async function startHttpServer() {
  const server = new GraphQLServer({ schema })

  server.express.use(cors({ origin: 'http://localhost:3000' }))
  server.express.use(compression())

  server.express.post('/api/rooms', checkJwt, createRoomHandler)

  const port = Number(process.env.PORT) || 4000
  await server.start({ port, subscriptions: { path: '/subscriptions' } })
  console.log(`API listening on http://localhost:${port}`)
}

startHttpServer().catch(console.error)
