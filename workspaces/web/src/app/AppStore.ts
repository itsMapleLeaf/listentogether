import { createMessageHandler } from "@listen-together/shared"
import { History } from "history"
import { autorun, observable } from "mobx"
import { createRouter } from "../common/createRouter"
import { SocketStore } from "../socket/SocketStore"

type AppView = { type: "lobby" } | { type: "room"; slug: string }

export class AppStore {
  @observable
  view: AppView = { type: "lobby" }

  constructor(private socket: SocketStore, private history: History) {}

  addSocketListener = () => this.socket.listen(this.handleMessage)

  // TODO: find a better system for this
  initRouting = () => {
    const router = createRouter<AppView>({
      "/room/:slug": ({ slug }) => ({ type: "room", slug }),
      "/": () => ({ type: "lobby" }),
    })

    this.view = router.run(this.history.location.pathname) ?? { type: "lobby" }

    const unlistenHistory = this.history.listen((location) => {
      if (location.pathname === "/auth/callback") return
      this.view = router.run(location.pathname) ?? { type: "lobby" }
    })

    const cleanupAutorun = autorun(() => {
      const path = this.view.type === "lobby" ? "/" : `/room/${this.view.slug}`
      if (this.history.location.pathname === "/auth/callback") return
      if (path !== this.history.location.pathname) {
        this.history.push(path)
      }
    })

    return () => {
      unlistenHistory()
      cleanupAutorun()
    }
  }

  createRoom = () => {
    if (this.view.type === "lobby") {
      this.socket.send({ type: "clientCreateRoom" })
    }
  }

  private handleMessage = createMessageHandler({
    serverRoomCreated: async ({ slug }) => {
      if (this.view.type === "lobby") {
        this.view = { type: "room", slug }
      }
    },
  })
}
