import { ApolloProvider } from "@apollo/react-hooks"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { RootStore } from "./RootStore"
import { RootStoreProvider } from "./rootStoreContext"
import "./ui/index.css"

async function main() {
  const store = new RootStore()

  store.auth.getAuthState()

  ReactDOM.render(
    <ApolloProvider client={store.apolloClient}>
      <RootStoreProvider store={store}>
        <App />
      </RootStoreProvider>
    </ApolloProvider>,
    document.getElementById("root"),
  )
}

main().catch(console.error)
