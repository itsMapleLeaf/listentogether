import compression from "compression"
import cors from "cors"
import express from "express"
import http from "http"
import { createSocketServer } from "./socket"

const app = express()
app.use(cors({ origin: "http://localhost:3000" }))
app.use(compression())

const httpServer = new http.Server(app)

createSocketServer(httpServer)

const port = Number(process.env.PORT) || 4000
httpServer.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
