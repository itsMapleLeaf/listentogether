import React from "react"
import { useRoutes } from "../navigation/routerContext"

type Props = {}

function Login(props: Props) {
  let routes = useRoutes()
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
