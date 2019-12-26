import { RequestHandler } from 'express'

export const createRoomHandler: RequestHandler = (req, res) => {
  res.send({
    msg: 'i love you',
  })
}
