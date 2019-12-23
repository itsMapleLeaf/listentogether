import { createRouter, defineRoute } from "type-route"

export let router = createRouter({
  home: defineRoute("/"),
  login: defineRoute("/login"),
  signup: defineRoute("/signup"),
})

export let { routes } = router
