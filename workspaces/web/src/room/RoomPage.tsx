import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { TagProps } from "../react/types"
import { SocketStore } from "../socket/SocketStore"
import AddTrackForm from "../track/AddTrackForm"
import TrackList from "../track/TrackList"
import { RoomStore } from "./RoomStore"
import testbg from "./testbg.webp"

type Props = {
  slug: string
  socketStore: SocketStore
}

function RoomPage(props: Props) {
  const store = useMemo(() => new RoomStore(props.socketStore), [
    props.socketStore,
  ])

  useEffect(() => store.joinRoom(props.slug), [store, props.slug])
  useEffect(() => store.addSocketListener(), [store])

  return (
    <main
      className="h-full bg-center bg-cover flex flex-col items-start"
      style={{ backgroundImage: `url(${testbg})` }}
    >
      <FrostPanel className="flex-1 min-h-0 flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto">
          <TrackList tracks={store.tracks} />
        </div>
        <AddTrackForm onAddTrack={store.addYoutubeTrack} />
      </FrostPanel>
      <FrostPanel className="h-12 self-stretch">
        UserBottomNavContent
      </FrostPanel>
    </main>
  )
}

export default observer(RoomPage)

const FrostPanel = (props: TagProps<"section">) => (
  <section {...props} className={`${props.className} frost-dark shadow-lg`} />
)
