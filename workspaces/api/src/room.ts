import { Photon } from '@prisma/photon'
import { RequestHandler } from 'express'
import { humanId } from 'human-id'

const photon = new Photon()

export const createRoomHandler: RequestHandler = async (req, res, next) => {
  const userId = req.user?.sub
  if (!userId) return next('userId not found')

  try {
    const room =
      (await photon.rooms.findOne({ where: { ownerId: userId } })) ??
      (await photon.rooms.create({
        data: { slug: createRoomSlug(), ownerId: userId },
      }))

    res.send({
      slug: room.slug,
      // IDEA: might be useful to tell the user on the frontend whether the room has already existed,
      // so maybe add some extra status value for that
    })
  } catch (error) {
    next(error)
  }
}

const createRoomSlug = () => humanId({ capitalize: false, separator: '-' })
