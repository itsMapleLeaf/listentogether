import {
  deserializeMessage,
  serializeMessage,
  SocketMessage,
} from "@listen-together/shared"
import { useEffect, useMemo, useRef, useState } from "react"

type SocketStatus = "connecting" | "online" | "reconnecting"

const socketUrl = `ws://localhost:4000/api/socket`

export function useSocket() {
  const [status, setStatus] = useState<SocketStatus>("connecting")
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    const openConnection = () => {
      const socket = (socketRef.current = new WebSocket(socketUrl))

      socket.onopen = () => {
        setStatus("online")
      }

      socket.onclose = () => {
        setStatus("reconnecting")
        removeSocketListeners()
        setTimeout(openConnection, 3000)
      }

      socket.onerror = () => {
        setStatus("reconnecting")
        removeSocketListeners()
        setTimeout(openConnection, 3000)
      }
    }

    const removeSocketListeners = () => {
      if (!socketRef.current) return
      socketRef.current.onopen = null
      socketRef.current.onclose = null
      socketRef.current.onerror = null
      socketRef.current.onmessage = null
    }

    openConnection()

    return () => {
      removeSocketListeners()
      socketRef.current?.close()
    }
  }, [])

  const state = useMemo(() => ({ status }), [status])

  const actions = useMemo(() => {
    const listen = (handleMessage: (message: SocketMessage) => void) => {
      const listener = ({ data }: MessageEvent) =>
        handleMessage(deserializeMessage(data))

      socketRef.current?.addEventListener("message", listener)
      socketRef.current?.removeEventListener("message", listener)
    }

    const send = (message: SocketMessage) => {
      socketRef.current?.send(serializeMessage(message))
    }

    return { listen, send }
  }, [])

  return [state, actions]
}
