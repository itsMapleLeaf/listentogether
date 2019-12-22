import React from "react"
import { Link } from "react-router-dom"

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
      <Link to="/">return to home</Link>
    </>
  )
}

export default Login
