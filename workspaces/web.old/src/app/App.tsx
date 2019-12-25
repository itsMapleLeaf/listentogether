import { observer } from "mobx-react-lite"
import React from "react"
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import { appRoutes } from "../navigation/NavigationStore"
import Route from "../navigation/Route"
import { useRootStore } from "../rootStoreContext"
import Home from "./Home"

function App() {
  const { auth } = useRootStore()

  return (
    <>
      <Route route={appRoutes.home}>
        <Home isAuthenticated={auth.authState.type === "authenticated"} />
      </Route>
      <Route route={appRoutes.login}>
        <Login />
      </Route>
      <Route route={appRoutes.signup}>
        <Signup />
      </Route>
    </>
  )
}

export default observer(App)
