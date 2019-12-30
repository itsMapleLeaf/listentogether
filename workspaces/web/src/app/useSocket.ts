import { useEffect, useState } from "react"

const socketUrl = `ws://localhost:4000/api/socket`

type SocketState =
  | { type: "connecting" }
  | { type: "online" }
  | { type: "reconnecting" }

export function useSocket() {
  const [state, setState] = useState<SocketState>({ type: "connecting" })

  useEffect(() => {
    let socket: WebSocket | undefined

    function connect() {
      socket = new WebSocket(socketUrl)

      socket.onopen = () => {
        setState({ type: "online" })
      }

      socket.onclose = () => {
        setState({ type: "reconnecting" })
        setTimeout(connect, 1000)
      }

      socket.onerror = () => {}

      socket.onmessage = () => {}
    }

    connect()

    return () => {
      if (!socket) return
      socket.onopen = null
      socket.onclose = null
      socket.onerror = null
      socket.onmessage = null
      socket.close()
    }
  }, [])

  return state
}
