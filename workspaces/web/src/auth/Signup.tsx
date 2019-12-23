import React from "react"
import { useRoutes } from "../navigation/routerContext"

type Props = {}

function Signup(props: Props) {
  const routes = useRoutes()
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
      <a {...routes.home.link()}>return to home</a>
    </>
  )
}

export default Signup
