import "focus-visible"
import React from "react"
import ReactDOM from "react-dom"
import WebFont from "webfontloader"
import App from "./app/App"
import "./ui/style.css"

WebFont.load({
  google: { families: ["Rubik"] },
})

function renderApp() {
  ReactDOM.render(<App />, document.getElementById("root"))
}

renderApp()

declare const module: {
  hot?: { accept(deps: string, callback: () => void): void }
}
if (module.hot) {
  module.hot.accept("./app/App", renderApp)
}
