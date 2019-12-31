import { ValueOf } from "@listen-together/shared"
import { mdiPencil, mdiPlaylistPlay } from "@mdi/js"
import { Icon as MaterialIcon } from "@mdi/react"
import React from "react"

type Props = {
  icon: ValueOf<typeof icons>
  size?: number
}

function Icon(props: Props) {
  return (
    <MaterialIcon
      path={props.icon}
      size={props.size ?? 1}
      color="currentColor"
    />
  )
}

export default Icon

export const icons = {
  playlist: mdiPlaylistPlay,
  pencil: mdiPencil,
}
