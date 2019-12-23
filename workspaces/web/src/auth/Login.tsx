import React from "react"
import { routes } from "../navigation/router"

type Props = {}

function Login(props: Props) {
  return (
    <>
      <h1>log in</h1>
      <form>
        <label>
          <div>email</div>
          <input type="text" />
        </label>
        <label>
          <div>password</div>
          <input type="password" />
        </label>
        <button type="submit">submit</button>
      </form>
      <a {...routes.home.link()}>return to home</a>
    </>
  )
}

export default Login
