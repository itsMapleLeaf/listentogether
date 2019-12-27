import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./app/App"

const client = new ApolloClient({
  uri: `http://localhost:4000`,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root"),
)
