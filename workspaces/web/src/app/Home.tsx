import React from "react"
import { useRoutes } from "../navigation/routerContext"

function Home() {
  let routes = useRoutes()
  return (
    <>
      <a {...routes.login.link()}>log in</a> |{" "}
      <a {...routes.signup.link()}>sign up</a>
    </>
  )
}

export default Home
