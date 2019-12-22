import createRouter from "./routing/createRouter"

type Route = { name: "home" } | { name: "login" } | { name: "signup" }

export let { Router, Route, Link } = createRouter<Route>()
