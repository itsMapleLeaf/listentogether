import React from "react"
import { TagProps } from "../react/types"

function FlatButton(props: TagProps<"button">) {
  return (
    <button
      {...props}
      className={`${props.className} h-12 px-3 opacity-50 hover:opacity-100 transition active-press`}
    />
  )
}

export default FlatButton
