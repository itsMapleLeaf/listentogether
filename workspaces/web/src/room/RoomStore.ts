import { createMessageHandler } from "@listen-together/shared"
import { observable } from "mobx"
import { SocketStore } from "../socket/SocketStore"
import { Track } from "../track/types"

export class RoomStore {
  @observable
  tracks: Track[] = []

  constructor(private readonly socket: SocketStore) {}

  joinRoom = (slug: string) => {
    this.socket.send({ type: "clientJoinRoom", params: { slug } })
  }

  addYoutubeTrack = (url: string) => {
    this.socket.send({ type: "clientAddTrack", params: { youtubeUrl: url } })
  }

  addSocketListener = () =>
    this.socket.listen(
      createMessageHandler({
        serverUpdateTracks: ({ tracks }) => {
          this.tracks = tracks
        },
      }),
    )
}
