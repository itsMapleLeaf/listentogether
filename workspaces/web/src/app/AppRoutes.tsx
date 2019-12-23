import React from "react"
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import Route from "../navigation/Route"
import { useRoutes } from "../navigation/routerContext"
import Home from "./Home"

export default function AppRoutes() {
  let routes = useRoutes()
  return (
    <>
      <Route route={routes.home} component={Home} />
      <Route route={routes.login} component={Login} />
      <Route route={routes.signup} component={Signup} />
    </>
  )
}
