import compression from 'compression'
import cors from 'cors'
import express from 'express'
import { checkJwt } from './auth'
import { createRoomHandler } from './room'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(compression())
app.use(checkJwt)

app.post('/rooms', createRoomHandler)

const port = Number(process.env.PORT) || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
