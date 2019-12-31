import "focus-visible"
import React from "react"
import ReactDOM from "react-dom"
import WebFont from "webfontloader"
import App from "./app/App"
import "./ui/style.css"

WebFont.load({
  google: { families: ["Rubik"] },
})

ReactDOM.render(<App />, document.getElementById("root"))
