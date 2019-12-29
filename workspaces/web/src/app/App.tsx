import React from "react"
import { Route, Switch } from "react-router-dom"
import { AuthClientProvider } from "../auth/authClientContext"
import { AuthUserProvider } from "../auth/authUserContext"
import { useAuth } from "../auth/useAuth"
import RoomPage from "../room/RoomPage"
import HomePage from "./HomePage"
import LoginPage from "./LoginPage"
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
        <AuthClientProvider>
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
        <AuthClientProvider>
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
