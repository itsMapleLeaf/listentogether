import createRouter from "./routing/createRouter"

export type AppRoute = { name: "home" } | { name: "login" } | { name: "signup" }

export let { Router, RouterContext, useRouter, Route, Link } = createRouter<
  AppRoute
>()
