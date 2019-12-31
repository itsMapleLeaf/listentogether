import React, { useState } from "react"
import SolidButton from "../ui/SolidButton"

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
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          borderBottom: "4px solid rgba(255, 255, 255, 0.3)",
        }}
        className="h-12 px-4"
        type="text"
        placeholder="Add a youtube URL..."
        value={newTrackUrl}
        onChange={(e) => setNewTrackUrl(e.target.value)}
      />
      <SolidButton style={{ borderRadius: 0 }} type="submit">
        add
      </SolidButton>
    </form>
  )
}

export default AddTrackForm
