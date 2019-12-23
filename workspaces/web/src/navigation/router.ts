import { createRouter, defineRoute } from "type-route"

export function createAppRouter() {
  return createRouter({
    home: defineRoute("/"),
    login: defineRoute("/login"),
    signup: defineRoute("/signup"),
  })
}

export type AppRouter = ReturnType<typeof createAppRouter>
