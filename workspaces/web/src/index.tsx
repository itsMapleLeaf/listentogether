import React from "react"
import ReactDOM from "react-dom"
import Home from "./Home"
import "./index.css"
import Login from "./Login"
import { Route, Router } from "./router"
import Signup from "./Signup"

ReactDOM.render(
  <Router initial={{ name: "home" }}>
    <Route name="home" children={<Home />} />
    <Route name="login" children={<Login />} />
    <Route name="signup" children={<Signup />} />
  </Router>,
  document.getElementById("root"),
)
