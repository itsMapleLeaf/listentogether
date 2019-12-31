import React from "react"
import { TagProps } from "../react/types"

function Button(props: TagProps<"button">) {
  return (
    <button
      {...props}
      className={`${props.className} bg-blue-700 hover:bg-blue-600 transition px-4 py-2 rounded-lg uppercase font-medium shadow-md active-press`}
    />
  )
}

export default Button
