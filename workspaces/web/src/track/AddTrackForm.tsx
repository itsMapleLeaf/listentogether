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
    <form onSubmit={handleSubmit} className="flex flex-row">
      <input
        className="text-input"
        type="text"
        placeholder="Add a YouTube URL..."
        value={newTrackUrl}
        onChange={(e) => setNewTrackUrl(e.target.value)}
      />
      <button
        className="solid-button"
        style={{ borderRadius: 0 }}
        type="submit"
      >
        add
      </button>
    </form>
  )
}

export default AddTrackForm
