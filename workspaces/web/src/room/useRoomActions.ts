import { useMemo } from "react"
import { firebaseApp } from "../firebase"

export function useRoomActions(slug: string) {
  return useMemo(
    () => ({
      async addYoutubeTrack(youtubeUrl: string) {
        const result = await firebaseApp
          .firestore()
          .collection("rooms")
          .where("slug", "==", slug)
          .get()

        await result.docs[0].ref.collection("tracks").add({ youtubeUrl })
      },
    }),
    [slug],
  )
}
