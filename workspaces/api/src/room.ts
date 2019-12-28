import { RequestHandler } from 'express'
import { humanId } from 'human-id'
import { objectType, stringArg, subscriptionField } from 'nexus'
import { photon } from './photon'
import { pubsub } from './pubsub'
import { Track } from './track'

export const Room = objectType({
  name: 'Room',
  definition(t) {
    t.list.field('tracks', { type: Track })
  },
})

export const roomSubscriptionField = subscriptionField('room', {
  type: Room,

  args: {
    slug: stringArg({ required: true }),
  },

  async resolve(_, { slug }) {
    const tracks = await photon.rooms.findOne({ where: { slug } }).tracks()
    return { tracks }
  },

  subscribe() {
    return pubsub.asyncIterator('TRACKS_UPDATED')
  },
})

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
