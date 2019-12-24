import React from "react"
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import Route from "../navigation/Route"
import { useRouter } from "../navigation/routerContext"
import Home from "./Home"

export default function AppRoutes() {
  const { router } = useRouter()
  const { routes } = router

  const handleLogin = (token: string) => {
    // etc.
  }

  return (
    <>
      <Route route={routes.home} render={() => <Home />} />
      <Route
        route={routes.login}
        render={() => <Login onLoginSuccess={handleLogin} />}
      />
      <Route route={routes.signup} render={() => <Signup />} />
    </>
  )
}
