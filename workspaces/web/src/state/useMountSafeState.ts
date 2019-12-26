import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"

/**
 * A wrapper around setState that prevents errors from being logged
 * if state is set after the component unmounts
 */
export function useMountSafeState<S>(init: S) {
  const [state, setState] = useState(init)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const wrappedSetState = useCallback((action: SetStateAction<S>) => {
    if (mountedRef.current) {
      return setState(action)
    }
  }, [])

  return [state, wrappedSetState] as const
}
