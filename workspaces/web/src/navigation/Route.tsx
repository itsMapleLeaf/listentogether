import { useObserver } from "mobx-react-lite"
import React from "react"
import { useRootStore } from "../rootStoreContext"
import { AppRoute } from "./NavigationStore"

type RouteProps = {
  route: AppRoute
  children?: React.ReactNode
}

/**
 * @param props
 * @template N The route name
 * @template P The route params, which are passed as props to the component
 */
export default function Route(props: RouteProps) {
  const { navigation } = useRootStore()
  const route = useObserver(() => navigation.route)
  return <>{route.name === props.route.name && props.children}</>
}
