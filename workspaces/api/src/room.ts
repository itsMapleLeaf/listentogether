import { Photon } from '@prisma/photon'
import { RequestHandler } from 'express'

const photon = new Photon()

export const createRoomHandler: RequestHandler = async (req, res) => {
  await photon.connect()

  const room = await photon.rooms.create({ data: {} })

  res.send({
    roomId: room.id,
  })

  await photon.disconnect()
}
