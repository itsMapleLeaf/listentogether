import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Home"
import "./index.css"
import Login from "./Login"
import Signup from "./Signup"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" children={<Login />} />
      <Route path="/signup" children={<Signup />} />
      <Route path="/" children={<Home />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root"),
)
