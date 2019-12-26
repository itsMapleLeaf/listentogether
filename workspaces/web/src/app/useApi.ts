import { useMemo } from "react"
import { useAuthClientContext } from "../auth/authClientContext"
import { fetchJson, FetchJsonOptions } from "../network/fetchJson"

export function useApi() {
  const client = useAuthClientContext()

  return useMemo(() => {
    async function fetchWithToken(
      endpoint: string,
      options: FetchJsonOptions = {},
    ) {
      const token = await client.getToken()
      return fetchJson(
        `http://localhost:4000/${endpoint.replace(/^\/+/, "")}`,
        {
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
            ...options.headers,
          },
        },
      )
    }

    return {
      async createRoom(): Promise<{ roomId: string }> {
        return fetchWithToken(`/rooms`, { method: "post" })
      },
    }
  }, [client])
}
