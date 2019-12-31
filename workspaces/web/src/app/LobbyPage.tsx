import React from "react"
import SolidButton from "../ui/SolidButton"

type Props = {
  onCreateRoom: () => void
  loading: boolean
}

function LobbyPage(props: Props) {
  return (
    <main className="text-center h-full flex flex-col justify-center items-center p-4">
      <p className="text-3xl mb-6">
        hi! create a new room to listen to music together!
      </p>
      <SolidButton onClick={props.onCreateRoom} disabled={props.loading}>
        create room
      </SolidButton>
    </main>
  )
}

export default LobbyPage
