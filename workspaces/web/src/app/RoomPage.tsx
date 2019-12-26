import React from "react"

type Props = { id: string }

function RoomPage(props: Props) {
  return <p>room id: {props.id}</p>
}

export default RoomPage
