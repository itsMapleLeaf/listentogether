import React, { useState } from "react"
import SolidButton from "../ui/SolidButton"
import TextInput from "../ui/TextInput"

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
      <TextInput
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
