import { objectType } from 'nexus'

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.id('id')
    t.string('youtubeUrl')
  },
})
