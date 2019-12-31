import React from "react"
import { TagProps } from "../react/types"

function SolidButton(props: TagProps<"button">) {
  return (
    <button
      {...props}
      className={`${props.className} bg-blue-700 hover:bg-blue-600 transition px-4 h-12 rounded-lg uppercase font-medium shadow-md active-press`}
    />
  )
}

export default SolidButton
