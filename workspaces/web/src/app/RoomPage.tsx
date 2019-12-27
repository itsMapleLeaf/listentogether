import React, { useState } from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import {
  useAddYouTubeTrackMutation,
  useRoomTracksQuery,
} from "../generated/graphql"

type Props = { slug: string }

function RoomPage({ slug }: Props) {
  const tracksQuery = useRoomTracksQuery({ variables: { slug } })
  const [newTrackUrl, setNewTrackUrl] = useState("")
  const [addTrack, addTrackMutation] = useAddYouTubeTrackMutation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await addTrack({
        variables: {
          roomSlug: slug,
          youtubeUrl: newTrackUrl,
        },
      })
    } catch {}

    setNewTrackUrl("")
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={addTrackMutation.loading}>
          <input
            type="text"
            placeholder="Add a youtube URL..."
            value={newTrackUrl}
            onChange={(e) => setNewTrackUrl(e.target.value)}
          />
          <button type="submit">add</button>
        </fieldset>
        {addTrackMutation.error && (
          <p>
            could not add track: {extractErrorMessage(addTrackMutation.error)}
          </p>
        )}
      </form>

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
    </main>
  )
}

export default RoomPage
