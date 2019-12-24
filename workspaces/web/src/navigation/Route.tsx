import React from "react"
import { RouteDefinition } from "type-route"
import { useCurrentRoute } from "./routerContext"

type RouteProps<N, P> = {
  route: RouteDefinition<N, P>
  render: (props: P) => React.ReactNode
}

/**
 * @param props
 * @template N The route name
 * @template P The route params, which are passed as props to the component
 */
export default function Route<N extends string, P>(props: RouteProps<N, P>) {
  const route = useCurrentRoute()
  return (
    <>{route.name === props.route.name && props.render(route.params as P)}</>
  )
}
