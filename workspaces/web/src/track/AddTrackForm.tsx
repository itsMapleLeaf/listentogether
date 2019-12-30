import React, { useState } from "react"

type Props = {
  onAddTrack: (url: string) => void
}

function AddTrackForm(props: Props) {
  const [newTrackUrl, setNewTrackUrl] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    props.onAddTrack(newTrackUrl)
    setNewTrackUrl("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a youtube URL..."
        value={newTrackUrl}
        onChange={(e) => setNewTrackUrl(e.target.value)}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default AddTrackForm
