import { humanId } from "human-id"
import { photon } from "./photon"

export async function getOrCreateRoom(ownerId: string) {
  return (
    (await photon.rooms.findOne({ where: { ownerId } })) ??
    (await photon.rooms.create({ data: { slug: createRoomSlug(), ownerId } }))
  )
}

export async function addYouTubeTrackToRoom(
  roomSlug: string,
  youtubeUrl: string,
) {
  await photon.rooms.update({
    where: { slug: roomSlug },
    data: {
      tracks: {
        create: { title: youtubeUrl, youtubeUrl: youtubeUrl },
      },
    },
    select: { tracks: true },
  })
}

const createRoomSlug = () => humanId({ capitalize: false, separator: "-" })
