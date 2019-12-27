import { mutationField, objectType, stringArg } from 'nexus'
import { photon } from './photon'

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.id('id')
    t.string('youtubeUrl')
  },
})

const AddYouTubeTrackResult = objectType({
  name: 'AddYouTubeTrackResult',
  definition(t) {
    t.boolean('success')
  },
})

export const addYouTubeTrack = mutationField('addYouTubeTrack', {
  args: {
    roomSlug: stringArg({ nullable: false }),
    youtubeUrl: stringArg({ nullable: false }),
  },

  type: AddYouTubeTrackResult,

  async resolve(_, { roomSlug, youtubeUrl }) {
    await photon.rooms.update({
      where: { slug: roomSlug },
      data: {
        tracks: {
          create: { title: youtubeUrl, youtubeUrl: youtubeUrl },
        },
      },
    })

    return {
      success: true,
    }
  },
})
