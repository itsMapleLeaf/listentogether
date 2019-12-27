import { queryType, stringArg } from 'nexus'
import { photon } from './photon'
import { Room } from './room'

export const Query = queryType({
  definition(t) {
    t.field('room', {
      type: Room,
      args: {
        slug: stringArg(),
      },
      async resolve(_, { slug }) {
        const roomClient = photon.rooms.findOne({ where: { slug } })
        const tracks = await roomClient.tracks()

        return {
          tracks: tracks.map(t => ({
            id: t.id,
            youtubeUrl: t.youtubeUrl || '',
          })),
        }
      },
    })
  },
})
