import React, { useState } from "react"
import { addYoutubeTrack } from "../api"
import { extractErrorMessage } from "../common/extractErrorMessage"
import { useAsync } from "../state/useAsync"

type Props = {
  roomSlug: string
}

function AddTrackForm({ roomSlug }: Props) {
  const [newTrackUrl, setNewTrackUrl] = useState("")
  const [{ loading, error }, run] = useAsync()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await run(addYoutubeTrack(roomSlug, newTrackUrl))
    setNewTrackUrl("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <input
          type="text"
          placeholder="Add a youtube URL..."
          value={newTrackUrl}
          onChange={(e) => setNewTrackUrl(e.target.value)}
        />
        <button type="submit">add</button>
      </fieldset>
      {error && <p>could not add track: {extractErrorMessage(error)}</p>}
    </form>
  )
}

export default AddTrackForm
