import React from "react"
import { routes } from "../navigation/router"

function Home() {
  return (
    <>
      <a {...routes.login.link()}>log in</a> |{" "}
      <a {...routes.signup.link()}>sign up</a>
    </>
  )
}

export default Home
