import { useQuery, useSubscription } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import {
  InitialRoomTracksQuery,
  InitialRoomTracksQueryVariables,
  RoomTracksSubscription,
  RoomTracksSubscriptionVariables,
} from "../generated/graphql"

type Props = { roomSlug: string }

const initialTracksQuery = gql`
  query InitialRoomTracks($slug: String!) {
    room(slug: $slug) {
      tracks {
        id
        youtubeUrl
      }
    }
  }
`

const tracksSubscription = gql`
  subscription RoomTracks($slug: String!) {
    room(slug: $slug) {
      tracks {
        id
        youtubeUrl
      }
    }
  }
`

function TrackList({ roomSlug }: Props) {
  const { data, loading, error } = useQuery<
    InitialRoomTracksQuery,
    InitialRoomTracksQueryVariables
  >(initialTracksQuery, { variables: { slug: roomSlug } })

  const { data: subscriptionData } = useSubscription<
    RoomTracksSubscription,
    RoomTracksSubscriptionVariables
  >(tracksSubscription, { variables: { slug: roomSlug } })

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
