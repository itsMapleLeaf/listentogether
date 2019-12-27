import React, { useState } from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import { useAddYouTubeTrackMutation } from "../generated/graphql"

type Props = {
  roomSlug: string
}

function AddTrackForm({ roomSlug }: Props) {
  const [newTrackUrl, setNewTrackUrl] = useState("")
  const [addTrack, addTrackMutation] = useAddYouTubeTrackMutation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await addTrack({
        variables: {
          roomSlug,
          youtubeUrl: newTrackUrl,
        },
      })
    } catch {}

    setNewTrackUrl("")
  }

  return (
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
  )
}

export default AddTrackForm
