import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import React from "react"
import ReactDOM from "react-dom"
import AppRoutes from "./app/AppRoutes"
import { createAppRouter } from "./navigation/router"
import { RouterProvider } from "./navigation/routerContext"
import "./ui/index.css"

const router = createAppRouter()
const client = new ApolloClient({ uri: "http://localhost:4000" })

ReactDOM.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router}>
      <AppRoutes />
    </RouterProvider>
  </ApolloProvider>,
  document.getElementById("root"),
)
