import React, { useState } from "react"
import createContextWrapper from "../createContextWrapper"

type RouteType = { name: string }

export default function createRouter<TRoute extends RouteType>() {
  let [Router, useRouter] = createContextWrapper(
    (props: { initial: TRoute }) => {
      let [route, setRoute] = useState<TRoute>(props.initial)
      return { route, setRoute }
    },
  )

  function Route(props: { name: TRoute["name"]; children: React.ReactNode }) {
    let router = useRouter()
    return <>{router.route.name === props.name && props.children}</>
  }

  function Link(props: { to: TRoute; children: React.ReactNode }) {
    let router = useRouter()

    let handleClick = () => {
      router.setRoute(props.to)
    }

    if (React.isValidElement(props.children)) {
      return React.cloneElement(props.children, {
        onClick: handleClick,
      })
    }

    return <button onClick={handleClick}>{props.children}</button>
  }

  return { Router, useRouter, Route, Link }
}
