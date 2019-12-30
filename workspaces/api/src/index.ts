import compression from "compression"
import cors from "cors"
import express from "express"
import http from "http"
import WebSocket from "ws"

const app = express()
app.use(cors({ origin: "http://localhost:3000" }))
app.use(compression())

const httpServer = new http.Server(app)

const socketServer = new WebSocket.Server({
  server: httpServer,
  path: "/api/socket",
})

socketServer.on("connection", (client, request) => {
  console.info(`connected: ${request.connection.remoteAddress}`)
})

const port = Number(process.env.PORT) || 4000
httpServer.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
