import React, { useMemo, useState } from "react"
import createContextWrapper from "../createContextWrapper"

export default function createRouter<TRoute extends { name: string }>() {
  let useRouter = createContextWrapper((props: { initial: TRoute }) => {
    let [route, setRoute] = useState<TRoute>(props.initial)

    const state = useMemo(() => ({ route }), [route])
    const actions = useMemo(() => ({ setRoute }), [])

    return [state, actions] as const
  })

  let Router = useRouter.Provider
  let RouterContext = useRouter.Context

  function Route(props: { name: TRoute["name"]; children: React.ReactNode }) {
    let [{ route }] = useRouter()
    return <>{route.name === props.name && props.children}</>
  }

  function Link(props: { to: TRoute; children: React.ReactNode }) {
    let [, { setRoute }] = useRouter()

    let handleClick = () => {
      setRoute(props.to)
    }

    if (React.isValidElement(props.children)) {
      return React.cloneElement(props.children, {
        onClick: handleClick,
      })
    }

    return <button onClick={handleClick}>{props.children}</button>
  }

  return { Router, RouterContext, useRouter, Route, Link }
}
