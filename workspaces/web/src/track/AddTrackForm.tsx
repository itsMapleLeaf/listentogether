import React, { useState } from "react"

type Props = {
  roomSlug: string
  // onTrackAdded?: () => void
}

function AddTrackForm({ roomSlug }: Props) {
  const [newTrackUrl, setNewTrackUrl] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      // TODO
    } catch {}

    setNewTrackUrl("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <input
          type="text"
          placeholder="Add a youtube URL..."
          value={newTrackUrl}
          onChange={(e) => setNewTrackUrl(e.target.value)}
        />
        <button type="submit">add</button>
      </fieldset>
      {/* {error && <p>could not add track: {extractErrorMessage(error)}</p>} */}
    </form>
  )
}

export default AddTrackForm
