import React from "react"
import { TagProps } from "../react/types"

type Props = TagProps<"button">

function SolidButton({ className, ...props }: Props) {
  return (
    <button
      {...props}
      className={`${className} bg-blue-700 hover:bg-blue-600 transition px-4 h-12 uppercase font-medium active-press`}
    />
  )
}

export default SolidButton
