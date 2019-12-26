import { useCallback, useMemo } from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import { useMountSafeState } from "./useMountSafeState"

type AsyncState =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; error: string }

export function useAsync() {
  const [state, setState] = useMountSafeState<AsyncState>({ type: "idle" })

  const computedState = useMemo(
    () => ({
      current: state,
      loading: state.type === "loading",
      error: state.type === "error" ? state.error : undefined,
    }),
    [state],
  )

  const run = useCallback(
    async function run<T>(promise: Promise<T>) {
      setState({ type: "loading" })

      try {
        const value = await promise
        setState({ type: "idle" })
        return value
      } catch (error) {
        setState({ type: "error", error: extractErrorMessage(error) })
        throw error
      }
    },
    [setState],
  )

  return [computedState, run] as const
}
