import React, { useEffect, useState } from "react"
import { watchTracks } from "../api"

type Props = { roomSlug: string }

function TrackList({ roomSlug }: Props) {
  const [tracks, setTracks] = useState()

  useEffect(() => watchTracks(roomSlug, setTracks), [roomSlug])

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
