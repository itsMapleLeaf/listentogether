import { firebaseApp } from "./firebase"

export type Room = {
  slug: string
}

export type Track = {
  id: string
  youtubeUrl: string
}

function roomQuery(slug: string) {
  return firebaseApp
    .firestore()
    .collection("rooms")
    .where("slug", "==", slug)
}

export async function createRoom(): Promise<Room> {
  return { slug: "human-readable-name" }
}

export async function addYoutubeTrack(roomSlug: string, youtubeUrl: string) {
  const result = await roomQuery(roomSlug).get()
  await result.docs[0]?.ref.collection("tracks").add({ youtubeUrl })
}

export function watchTracks(
  roomSlug: string,
  callback: (tracks: Track[]) => void,
) {
  return roomQuery(roomSlug).onSnapshot((snap) => {
    snap.docs[0]?.ref.collection("tracks").onSnapshot((snap) => {
      callback(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Track)))
    })
  })
}
