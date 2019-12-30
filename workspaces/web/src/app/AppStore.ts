import { createMessageHandler } from "@listen-together/shared"
import { createBrowserHistory } from "history"
import { autorun, observable } from "mobx"
import { createRouter } from "../common/createRouter"
import { SocketStore } from "../socket/SocketStore"

type AppView = { type: "lobby" } | { type: "room"; slug: string }

const history = createBrowserHistory()

export class AppStore {
  @observable
  view: AppView = { type: "lobby" }

  constructor(private socket: SocketStore) {}

  addSocketListener = () => this.socket.listen(this.handleMessage)

  // TODO: find a better system for this
  initRouting = () => {
    const router = createRouter<AppView>({
      "/room/:slug": ({ slug }) => ({ type: "room", slug }),
      "/": () => ({ type: "lobby" }),
    })

    this.view = router.run(history.location.pathname) ?? { type: "lobby" }

    const unlistenHistory = history.listen((location) => {
      this.view = router.run(location.pathname) ?? { type: "lobby" }
    })

    const cleanupAutorun = autorun(() => {
      const path = this.view.type === "lobby" ? "/" : `/room/${this.view.slug}`
      if (path !== history.location.pathname) {
        history.push(path)
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
