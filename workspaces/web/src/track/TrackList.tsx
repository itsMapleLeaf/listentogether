import React from "react"
import { Track } from "./types"

type Props = { tracks: Track[] }

function TrackList(props: Props) {
  return (
    <ul>
      {props.tracks.map((track) => (
        <li className="m-4" key={track.id}>
          {track.youtubeUrl}
        </li>
      ))}
    </ul>
  )
}

export default TrackList
