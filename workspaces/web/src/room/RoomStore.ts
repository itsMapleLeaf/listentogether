import { observable } from "mobx"
import { createMessageHandler } from "../socket/createMessageHandler"
import { SocketStore } from "../socket/SocketStore"
import { Track } from "../track/types"

export class RoomStore {
  @observable
  tracks: Track[] = []

  constructor(
    private readonly roomSlug: string,
    private readonly socket: SocketStore,
  ) {}

  addSocketListener = () =>
    this.socket.listen(
      createMessageHandler({
        serverUpdateTracks: ({ tracks }) => {
          this.tracks = tracks
        },
      }),
    )

  requestTracks = () => {
    this.socket.send({
      type: "clientRequestTracks",
      params: { roomSlug: this.roomSlug },
    })
  }

  addYoutubeTrack = (url: string) => {
    this.socket.send({
      type: "clientAddTrack",
      params: { roomSlug: this.roomSlug, youtubeUrl: url },
    })
  }
}
