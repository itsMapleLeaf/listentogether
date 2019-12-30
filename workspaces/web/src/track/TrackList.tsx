import React from "react"
import { Track } from "./types"

type Props = { tracks: Track[] }

function TrackList(props: Props) {
  return (
    <>
      <h2>track list</h2>
      <ul>
        {props.tracks.map((track) => (
          <li key={track.id}>{track.youtubeUrl}</li>
        ))}
      </ul>
    </>
  )
}

export default TrackList
