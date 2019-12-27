import React from "react"
import AddTrackForm from "../track/AddTrackForm"
import TrackList from "../track/TrackList"

type Props = { slug: string }

function RoomPage({ slug }: Props) {
  return (
    <main>
      <AddTrackForm roomSlug={slug} />
      <TrackList roomSlug={slug} />
    </main>
  )
}

export default RoomPage
