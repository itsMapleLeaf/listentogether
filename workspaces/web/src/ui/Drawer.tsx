import React, { CSSProperties } from "react"
import { TagProps } from "../react/types"

type Props = TagProps<"div"> & {
  side: "left" | "right"
  visible: boolean
}

function Drawer({ side, ...props }: Props) {
  const style: CSSProperties = {
    transform: props.visible
      ? `translateX(0)`
      : `translateX(${side === "left" ? "-100%" : "100%"})`,
  }
  return (
    <div
      {...props}
      className={`${props.className} transition-slow`}
      style={{ ...style, ...props.style }}
    />
  )
}

export default Drawer
