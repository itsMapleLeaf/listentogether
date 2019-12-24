import { useApolloClient } from "@apollo/react-hooks"
import { useLocalStore } from "mobx-react-lite"
import React, { useEffect } from "react"
import { AuthStore } from "../auth/AuthStore"
import Login from "../auth/Login"
import Signup from "../auth/Signup"
import { useNavigationContext } from "../navigation/navigationContext"
import { appRoutes } from "../navigation/NavigationStore"
import Route from "../navigation/Route"
import Home from "./Home"

export default function AppRoutes() {
  const navigation = useNavigationContext()
  const client = useApolloClient()
  const auth = useLocalStore(() => new AuthStore(navigation, client))

  useEffect(() => {
    auth.getAuthState()
  }, [auth])

  return (
    <>
      <Route route={appRoutes.home} children={<Home />} />
      <Route route={appRoutes.login} children={<Login auth={auth} />} />
      <Route route={appRoutes.signup} children={<Signup />} />
    </>
  )
}
