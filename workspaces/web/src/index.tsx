import React from "react"
import ReactDOM from "react-dom"
import Home from "./Home"
import "./index.css"
import Login from "./Login"
import { Route, RouterProvider, routes } from "./router"
import Signup from "./Signup"

ReactDOM.render(
  <RouterProvider>
    <Route route={routes.home} component={Home} />
    <Route route={routes.login} component={Login} />
    <Route route={routes.signup} component={Signup} />
  </RouterProvider>,
  document.getElementById("root"),
)
