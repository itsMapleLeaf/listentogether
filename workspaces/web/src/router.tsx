import React, { useEffect, useState } from "react"
import { createRouter, defineRoute, RouteDefinition } from "type-route"
import createContextWrapper from "./createContextWrapper"

let router = createRouter({
  home: defineRoute("/"),
  login: defineRoute("/login"),
  signup: defineRoute("/signup"),
})

export let { routes } = router

export let useRouter = createContextWrapper(() => {
  let [route, setRoute] = useState(router.getCurrentRoute())
  useEffect(() => router.listen(setRoute), [])
  return route
})

export let RouterProvider = useRouter.Provider

type RouteProps<TRouteName, TParams> = {
  route: RouteDefinition<TRouteName, TParams>
  component: React.ComponentType<TParams>
}

export function Route<TRouteName extends string, TParams>(
  props: RouteProps<TRouteName, TParams>,
) {
  const route = useRouter()
  return (
    <>
      {route.name === props.route.name
        ? React.createElement(props.component, route.params as TParams)
        : null}
    </>
  )
}
