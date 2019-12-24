import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { storedToken } from "./auth/storedToken"
import { NavigationProvider } from "./navigation/navigationContext"
import "./ui/index.css"

const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: async (operation) => {
    const token = await storedToken.get()
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </ApolloProvider>,
  document.getElementById("root"),
)
