import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useState } from "react"
import { SocketStore } from "../socket/SocketStore"
import AddTrackForm from "../track/AddTrackForm"
import TrackList from "../track/TrackList"
import Drawer from "../ui/Drawer"
import FlatButton from "../ui/FlatButton"
import Icon, { icons } from "../ui/Icon"
import { RoomStore } from "./RoomStore"
import testbg from "./testbg.webp"

type Props = {
  slug: string
  socketStore: SocketStore
}

function RoomPage(props: Props) {
  const [trackListVisible, setTrackListVisible] = useState(true)

  const store = useMemo(() => new RoomStore(props.socketStore), [
    props.socketStore,
  ])

  useEffect(() => store.joinRoom(props.slug), [store, props.slug])
  useEffect(() => store.addSocketListener(), [store])

  return (
    <main
      className="h-full bg-center bg-cover flex flex-col items-stretch overflow-y-hidden"
      style={{ backgroundImage: `url(${testbg})` }}
    >
      <header className={`${frostPanel} h-12 px-4 flex items-center z-10`}>
        <p>
          welcome, <span className={`text-blue-400`}>username</span>!
        </p>
        <FlatButton>
          <Icon icon={icons.pencil} size={0.8} />
        </FlatButton>
      </header>

      <Drawer
        side="left"
        visible={trackListVisible}
        className={`flex-1 min-h-0 flex flex-col justify-between self-start frost-dark`}
      >
        <div className="flex-1 overflow-y-auto">
          <TrackList tracks={store.tracks} />
        </div>
        <AddTrackForm onAddTrack={store.addYoutubeTrack} />
      </Drawer>

      <section className={`h-12 flex flex-row items-stretch ${frostPanel}`}>
        <FlatButton onClick={() => setTrackListVisible((v) => !v)}>
          <Icon icon={icons.playlist} />
        </FlatButton>
      </section>
    </main>
  )
}

export default observer(RoomPage)

const frostPanel = `frost-dark shadow`
