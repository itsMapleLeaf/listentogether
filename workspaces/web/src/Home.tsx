import React from "react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <Link to="/login">log in</Link> | <Link to="/signup">sign up</Link>
    </>
  )
}

export default Home
