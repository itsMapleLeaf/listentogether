import React, { useEffect, useState } from "react"
import { watchTracks } from "../api"

type Props = { roomId: string }

function TrackList(props: Props) {
  const [tracks, setTracks] = useState()

  useEffect(() => watchTracks(props.roomId, setTracks), [props.roomId])

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
