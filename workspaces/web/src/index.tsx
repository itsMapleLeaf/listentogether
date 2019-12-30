import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { AppStore } from "./app/AppStore"
import { AppStoreProvider } from "./app/appStoreContext"

const store = new AppStore()
store.connect()

ReactDOM.render(
  <AppStoreProvider store={store}>
    <App />
  </AppStoreProvider>,
  document.getElementById("root"),
)
