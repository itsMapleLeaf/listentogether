import React from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"

type Props = { roomSlug: string }

function TrackList({ roomSlug }: Props) {
  const loading = false
  const error = undefined
  const tracks: any[] = []
  return (
    <>
      <h2>track list</h2>
      {loading && <p>loading...</p>}
      {error && <p>an error occurred: {extractErrorMessage(error)}</p>}
      {tracks && (
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>{track.youtubeUrl}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default TrackList
