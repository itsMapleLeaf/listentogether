import clsx from "clsx"
import React from "react"
import * as tw from "../ui/tailwind.module.css"

type Props = {
  onCreateRoom: () => void
  loading: boolean
}

function LobbyPage(props: Props) {
  return (
    <main
      className={clsx(
        tw.textCenter,
        tw.hFull,
        tw.flex,
        tw.flexCol,
        tw.justifyCenter,
        tw.itemsCenter,
        tw.p4,
      )}
    >
      <p className={clsx(tw.text3Xl, tw.mb6)}>
        hi! create a new room to listen to music together!
      </p>
      <button
        className={clsx(tw.solidButton, tw.shadowOffset, tw.roundedLg)}
        onClick={props.onCreateRoom}
        disabled={props.loading}
      >
        create room
      </button>
    </main>
  )
}

export default LobbyPage
