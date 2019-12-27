import React, { useEffect, useRef, useState } from "react"

type Props = { slug: string }

function RoomPage({ slug }: Props) {
  const [tracks, setTracks] = useState<{ id: string; youtubeUrl: string }[]>([])
  const [newTrackUrl, setNewTrackUrl] = useState("")
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000`)

    socket.onopen = () => {
      socketRef.current = socket

      socket.send(JSON.stringify({ type: "client-set-slug", roomSlug: slug }))
      socket.send(JSON.stringify({ type: "client-request-tracks" }))
    }

    socket.onmessage = ({ data }) => {
      const message = JSON.parse(String(data))
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
  }, [slug])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setNewTrackUrl("")
    socketRef.current?.send(
      JSON.stringify({ type: "client-add-track", youtubeUrl: newTrackUrl }),
    )
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
