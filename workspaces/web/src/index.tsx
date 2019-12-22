import { createBrowserHistory, Location } from "history"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import ReactDOM from "react-dom"
import Home from "./Home"
import "./index.css"
import Login from "./Login"
import { AppRoute, Route, Router, RouterContext, useRouter } from "./router"
import Signup from "./Signup"

let history = createBrowserHistory()

function BrowserRouterBridge(props: { children: React.ReactNode }) {
  let [state, actions] = useRouter()
  let [ready, setReady] = useState(false)

  function locationToRoute({ pathname }: Location): AppRoute | undefined {
    if (pathname === "/") return { name: "home" }
    if (pathname === "/login") return { name: "login" }
    if (pathname === "/signup") return { name: "signup" }
  }

  function routeToLocation(route: AppRoute) {
    switch (route.name) {
      case "home":
        return "/"
      case "login":
        return "/login"
      case "signup":
        return "/signup"
    }
  }

  const syncRouteWithLocation = useCallback(
    (location: Location) => {
      const newRoute = locationToRoute(location)
      if (newRoute) actions.setRoute(newRoute)
    },
    [actions],
  )

  useEffect(() => {
    syncRouteWithLocation(history.location)
    setReady(true)
  }, [syncRouteWithLocation])

  useEffect(() => {
    return history.listen(syncRouteWithLocation)
  }, [actions, syncRouteWithLocation])

  const newContext = useMemo(() => {
    function setBrowserRoute(route: { name: string }) {
      history.push(routeToLocation(route as any))
    }
    return [state, { ...actions, setRoute: setBrowserRoute }] as const
  }, [actions, state])

  console.log("render")

  return (
    <RouterContext.Provider value={newContext}>
      {ready && props.children}
    </RouterContext.Provider>
  )
}

ReactDOM.render(
  <Router initial={{ name: "home" }}>
    <BrowserRouterBridge>
      <Route name="home" children={<Home />} />
      <Route name="login" children={<Login />} />
      <Route name="signup" children={<Signup />} />
    </BrowserRouterBridge>
  </Router>,
  document.getElementById("root"),
)
