import { makeSchema } from 'nexus'
import { join } from 'path'
import { Query } from './query'
import { addYouTubeTrack } from './track'

export const schema = makeSchema({
  types: [Query, addYouTubeTrack],
  outputs: {
    schema: join(__dirname, 'generated/schema.graphql'),
    typegen: join(__dirname, 'generated/nexus.d.ts'),
  },
  prettierConfig: join(__dirname, '../../../.prettierrc'),
})
