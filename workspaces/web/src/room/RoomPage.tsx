import React from "react"
import AddTrackForm from "../track/AddTrackForm"
import TrackList from "../track/TrackList"

type Props = { id: string }

function RoomPage({ id }: Props) {
  return (
    <main>
      <AddTrackForm roomId={id} />
      <TrackList roomId={id} />
    </main>
  )
}

export default RoomPage
