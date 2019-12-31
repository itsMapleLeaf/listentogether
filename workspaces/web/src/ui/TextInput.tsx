import React from "react"
import { TagProps } from "../react/types"

function TextInput(props: TagProps<"input">) {
  return (
    <input
      {...props}
      className={`${props.className} h-12 px-4 transition bg-soft-white border-b-4 border-color-soft-white focus:border-color-hard-white focus:outline-none`}
    />
  )
}

export default TextInput
