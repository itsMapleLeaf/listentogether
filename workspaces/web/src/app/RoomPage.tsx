import {
  ClientCommand,
  createSendCommand,
  parseCommand,
  ServerCommand,
} from "@listen-together/shared"
import React, { useCallback, useEffect, useRef, useState } from "react"

type Props = { slug: string }

function RoomPage({ slug }: Props) {
  type Track = {
    id: string
    youtubeUrl?: string | null
  }

  const [tracks, setTracks] = useState<Track[]>([])
  const [newTrackUrl, setNewTrackUrl] = useState("")

  const socketRef = useRef<WebSocket>()

  const sendCommand = useCallback(
    createSendCommand<ClientCommand>(() => socketRef.current),
    [],
  )

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000`)

    socket.onopen = () => {
      socketRef.current = socket
      sendCommand({ type: "client-set-slug", roomSlug: slug })
      sendCommand({ type: "client-request-tracks" })
    }

    socket.onmessage = ({ data }) => {
      const message = parseCommand<ServerCommand>(data)
      switch (message.type) {
        case "server-update-tracks":
          setTracks(message.tracks)
          break
      }
    }

    socket.onclose = () => {
      console.log("closed")
    }

    socket.onerror = () => {
      console.log("error")
    }

    return () => {
      socket.onopen = null
      socket.onclose = null
      socket.onerror = null
      socket.onmessage = null
      socket.close()
    }
  }, [sendCommand, slug])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    sendCommand({ type: "client-add-track", youtubeUrl: newTrackUrl })
    setNewTrackUrl("")
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a youtube URL..."
          value={newTrackUrl}
          onChange={(e) => setNewTrackUrl(e.target.value)}
        />
        <button type="submit">add</button>
      </form>

      <h2>track list</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.youtubeUrl}</li>
        ))}
      </ul>
    </main>
  )
}

export default RoomPage
