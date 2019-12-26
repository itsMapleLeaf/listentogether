import { Photon } from '@prisma/photon'
import { RequestHandler } from 'express'

const photon = new Photon()

export const createRoomHandler: RequestHandler = async (req, res, next) => {
  const userId = req.user?.sub
  if (!userId) return next('userId not found')

  try {
    await photon.connect()

    const room =
      (await photon.rooms.findOne({ where: { ownerId: userId } })) ??
      (await photon.rooms.create({ data: { ownerId: userId } }))

    await photon.disconnect()

    res.send({
      roomId: room.id,
      // IDEA: might be useful to tell the user on the frontend whether the room has already existed,
      // so maybe add some extra status value for that
    })
  } catch (error) {
    next(error)
  }
}
