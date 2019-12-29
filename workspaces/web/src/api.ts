import { firebaseApp } from "./firebase"

export type Room = {
  id: string
}

export type Track = {
  id: string
  youtubeUrl: string
}

function roomQuery(id: string) {
  return firebaseApp
    .firestore()
    .collection("rooms")
    .doc(id)
}

export async function createRoom(): Promise<Room> {
  return { id: "human-readable-name" }
}

export async function addYoutubeTrack(roomSlug: string, youtubeUrl: string) {
  const doc = await roomQuery(roomSlug).get()
  await doc.ref.collection("tracks").add({ youtubeUrl })
}

export function watchTracks(id: string, callback: (tracks: Track[]) => void) {
  let unsubscribeTracks = () => {}
  let cancelled = false

  roomQuery(id)
    .get()
    .then((doc) => {
      if (cancelled) return
      unsubscribeTracks = doc.ref.collection("tracks").onSnapshot((snap) => {
        callback(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Track)),
        )
      })
    })

  return () => {
    cancelled = true
    unsubscribeTracks()
  }
}
