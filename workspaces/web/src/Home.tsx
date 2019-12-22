import React from "react"
import { Link } from "./router"

function Home() {
  return (
    <>
      <Link to={{ name: "login" }}>log in</Link> |{" "}
      <Link to={{ name: "signup" }}>sign up</Link>
    </>
  )
}

export default Home
