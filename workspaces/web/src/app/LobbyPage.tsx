import React from "react"

type Props = {
  onCreateRoom: () => void
  disabled: boolean
}

function LobbyPage(props: Props) {
  return (
    <button onClick={props.onCreateRoom} disabled={props.disabled}>
      create room
    </button>
  )
}

export default LobbyPage
