import React from "react"
import ReactDOM from "react-dom"
import AppRoutes from "./app/AppRoutes"
import { createAppRouter } from "./navigation/router"
import { RouterProvider } from "./navigation/routerContext"
import "./ui/index.css"

let router = createAppRouter()

ReactDOM.render(
  <RouterProvider router={router}>
    <AppRoutes />
  </RouterProvider>,
  document.getElementById("root"),
)
