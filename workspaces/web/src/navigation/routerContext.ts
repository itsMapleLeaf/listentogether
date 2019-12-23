import { useEffect, useState } from "react"
import createContextWrapper from "../react/createContextWrapper"
import { router } from "./router"

export let useRouter = createContextWrapper(() => {
  let [route, setRoute] = useState(router.getCurrentRoute())
  useEffect(() => router.listen(setRoute), [])
  return route
})

export let RouterProvider = useRouter.Provider
