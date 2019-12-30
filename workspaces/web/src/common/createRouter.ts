import { match } from "path-to-regexp"

export function createRouter<R>(
  routes: { [_ in string]: (params: { [_ in string]: string }) => R },
) {
  return {
    run(pathname: string) {
      for (const path in routes) {
        const matchResult = match(path)(pathname)
        if (matchResult) {
          return routes[path](matchResult.params as any)
        }
      }
    },
  }
}
