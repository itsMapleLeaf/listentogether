import React, { ComponentPropsWithoutRef } from "react"
import { raise } from "../common/errors"
import { useRootStore } from "../rootStoreContext"
import { AppRoute } from "./NavigationStore"

type LinkProps = {
  to: AppRoute
  children: string | React.ReactElement
} & Omit<ComponentPropsWithoutRef<"a">, "children">

export default function Link({ to, children, ...props }: LinkProps) {
  const { navigation } = useRootStore()

  const handleClick = (event?: React.MouseEvent) => {
    event?.preventDefault()
    navigation.setRoute(to)
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick })
  }

  if (typeof children === "string") {
    return (
      <a href={to.path} onClick={handleClick} children={children} {...props} />
    )
  }

  raise("Invalid Link children: expected a single element or text")
}
