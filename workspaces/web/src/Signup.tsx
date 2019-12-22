import React from "react"
import { Link } from "./router"

type Props = {}

function Signup(props: Props) {
  return (
    <>
      <h1>sign up</h1>
      <form>
        <label>
          <div>name</div>
          <input type="text" />
        </label>
        <label>
          <div>email</div>
          <input type="email" />
        </label>
        <label>
          <div>password</div>
          <input type="password" />
        </label>
        <button type="submit">submit</button>
      </form>
      <Link to={{ name: "home" }}>return to home</Link>
    </>
  )
}

export default Signup
