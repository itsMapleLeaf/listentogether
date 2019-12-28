import React from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import { useRoomSubscription, useRoomTracksQuery } from "../generated/graphql"

type Props = { roomSlug: string }

function TrackList({ roomSlug }: Props) {
  const { data, loading, error } = useRoomTracksQuery({
    variables: { slug: roomSlug },
  })

  const { data: subscriptionData } = useRoomSubscription({
    variables: { slug: roomSlug },
  })

  const tracks = (subscriptionData || data)?.room.tracks

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
