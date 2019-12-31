import { PropsWithoutRef } from "react"

export type TagProps<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<
  JSX.IntrinsicElements[T]
>
