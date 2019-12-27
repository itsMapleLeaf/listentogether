import React, { useState } from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import { useRoomTracksQuery } from "../generated/graphql"

type Props = { slug: string }

function RoomPage({ slug }: Props) {
  const { loading, error, data } = useRoomTracksQuery({ variables: { slug } })
  const [newTrackUrl, setNewTrackUrl] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // sendCommand({ type: "client-add-track", youtubeUrl: newTrackUrl })
    setNewTrackUrl("")
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a youtube URL..."
          value={newTrackUrl}
          onChange={(e) => setNewTrackUrl(e.target.value)}
        />
        <button type="submit">add</button>
      </form>

      <h2>track list</h2>
      {loading && <p>loading...</p>}
      {error && <p>an error occurred: {extractErrorMessage(error)}</p>}
      {data && (
        <ul>
          {data.room.tracks.map((track) => (
            <li key={track.id}>{track.youtubeUrl}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default RoomPage
