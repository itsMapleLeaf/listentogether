import React from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import { useRoomTracksQuery } from "../generated/graphql"

type Props = { roomSlug: string }

function TrackList({ roomSlug }: Props) {
  const tracksQuery = useRoomTracksQuery({ variables: { slug: roomSlug } })
  return (
    <>
      <h2>track list</h2>
      {tracksQuery.loading && <p>loading...</p>}
      {tracksQuery.error && (
        <p>an error occurred: {extractErrorMessage(tracksQuery.error)}</p>
      )}
      {tracksQuery.data && (
        <ul>
          {tracksQuery.data.room.tracks.map((track) => (
            <li key={track.id}>{track.youtubeUrl}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default TrackList
