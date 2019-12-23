import { useEffect, useState } from "react"
import createContextWrapper from "../react/createContextWrapper"
import { AppRouter } from "./router"

let useRouter = createContextWrapper(({ router }: { router: AppRouter }) => {
  let [route, setRoute] = useState(router.getCurrentRoute())
  useEffect(() => router.listen(setRoute), [router])
  return { router, route }
})

export let RouterProvider = useRouter.Provider

export function useCurrentRoute() {
  return useRouter().route
}

export function useRoutes() {
  return useRouter().router.routes
}
