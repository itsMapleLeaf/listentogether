import React from "react"
import { Route, Switch } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import HomePage from "./HomePage"
import RoomPage from "./RoomPage"
import { routes } from "./routes"

function App() {
  const [state, actions] = useAuth()

  switch (state.type) {
    case "loading":
      return <p>loading...</p>

    case "error":
      return <p>oops! an error occurred: {state.error}</p>

    case "anonymous":
      return <button onClick={actions.login}>log in</button>

    case "authenticated":
      return (
        <Switch>
          <Route exact path={routes.home}>
            <HomePage {...state} onLogout={actions.logout} />
          </Route>
          <Route
            path={routes.room(":id")}
            render={({ match }) => <RoomPage id={match.params.id} />}
          />
        </Switch>
      )
  }
}

export default App
