import React from "react"

type Props = {
  onCreateRoom: () => void
  disabled: boolean
}

function LobbyPage(props: Props) {
  return (
    <main className="text-center h-full flex flex-col justify-center items-center p-4">
      <p className="text-3xl mb-6">
        hi! create a new room to listen to music together!
      </p>
      <button
        className="bg-blue-700 hover:bg-blue-600 transition px-4 py-2 rounded-lg uppercase font-medium shadow-md active-press"
        onClick={props.onCreateRoom}
        disabled={props.disabled}
      >
        create room
      </button>
    </main>
  )
}

export default LobbyPage
