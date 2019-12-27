import React from "react"
import { Route, Switch } from "react-router-dom"
import { AuthClientProvider } from "../auth/authClientContext"
import { AuthUserProvider } from "../auth/authUserContext"
import { useAuth } from "../auth/useAuth"
import HomePage from "./HomePage"
import LoginPage from "./LoginPage"
import RoomPage from "./RoomPage"
import { routes } from "./routes"

function App() {
  const state = useAuth()

  switch (state.type) {
    case "loading":
      return <p>loading...</p>

    case "error":
      return <p>oops! an error occurred: {state.error}</p>

    case "anonymous":
      return (
        <AuthClientProvider client={state.client}>
          <Switch>
            <Route exact path={routes.home}>
              <LoginPage />
            </Route>
            <Route path={routes.room(":slug")}>
              <LoginPage />
            </Route>
          </Switch>
        </AuthClientProvider>
      )

    case "authenticated":
      return (
        <AuthClientProvider client={state.client}>
          <AuthUserProvider user={state.user}>
            <Switch>
              <Route exact path={routes.home}>
                <HomePage />
              </Route>
              <Route
                path={routes.room(":slug")}
                render={({ match }) => <RoomPage slug={match.params.slug} />}
              />
            </Switch>
          </AuthUserProvider>
        </AuthClientProvider>
      )
  }
}

export default App
