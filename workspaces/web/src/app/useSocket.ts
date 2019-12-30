import { useEffect, useRef, useState } from "react"

const socketUrl = `ws://localhost:4000/api/socket`

type SocketState =
  | { type: "connecting" }
  | { type: "online" }
  | { type: "reconnecting" }

export function useSocket(onMessage: (message: any) => void) {
  const [state, setState] = useState<SocketState>({ type: "connecting" })
  const socketRef = useRef<WebSocket>()
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  })

  function sendCommand(command: object) {
    socketRef.current?.send(JSON.stringify(command))
  }

  useEffect(() => {
    let socket: WebSocket | undefined

    function connect() {
      socket = socketRef.current = new WebSocket(socketUrl)

      socket.onopen = () => {
        setState({ type: "online" })
      }

      socket.onclose = () => {
        setState({ type: "reconnecting" })
        removeHandlers()
        setTimeout(connect, 1000)
      }

      socket.onerror = () => {
        setState({ type: "reconnecting" })
        removeHandlers()
        setTimeout(connect, 1000)
      }

      socket.onmessage = ({ data }) => {
        const message = JSON.parse(String(data))
        onMessageRef.current(message)
      }
    }

    function removeHandlers() {
      if (!socket) return
      socket.onopen = null
      socket.onclose = null
      socket.onerror = null
      socket.onmessage = null
    }

    connect()

    return () => {
      removeHandlers()
      socket?.close()
    }
  }, [])

  return [state, sendCommand] as const
}
