import React, { useEffect, useState } from "react"
import { firebaseApp } from "../firebase"

type Props = { roomSlug: string }

function TrackList({ roomSlug }: Props) {
  const [tracks, setTracks] = useState()

  useEffect(() => {
    return firebaseApp
      .firestore()
      .collection("rooms")
      .where("slug", "==", roomSlug)
      .onSnapshot((snap) => {
        snap.docs[0].ref.collection("tracks").onSnapshot((snap) => {
          setTracks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        })
      })
  }, [roomSlug])

  return (
    <>
      <h2>track list</h2>
      {tracks && (
        <ul>
          {tracks.map((track: any) => (
            <li key={track.id}>{track.youtubeUrl}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default TrackList
