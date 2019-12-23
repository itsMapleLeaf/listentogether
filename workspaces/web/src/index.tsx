import React from "react"
import ReactDOM from "react-dom"
import Home from "./app/Home"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Route from "./navigation/Route"
import { routes } from "./navigation/router"
import { RouterProvider } from "./navigation/routerContext"
import "./ui/index.css"

ReactDOM.render(
  <RouterProvider>
    <Route route={routes.home} component={Home} />
    <Route route={routes.login} component={Login} />
    <Route route={routes.signup} component={Signup} />
  </RouterProvider>,
  document.getElementById("root"),
)
