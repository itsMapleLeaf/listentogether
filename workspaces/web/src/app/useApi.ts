import { useMemo } from "react"

export function useApi() {
  // const client = useAuthClientContext()

  return useMemo(() => {
    //   async function fetchWithToken(
    //     endpoint: string,
    //     options: FetchJsonOptions = {},
    //   ) {
    //     const token = await client.getToken()
    //     return fetchJson(
    //       `http://localhost:4000/${endpoint.replace(/^\/+/, "")}`,
    //       {
    //         ...options,
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           ...options.headers,
    //         },
    //       },
    //     )
    //   }

    return {
      async createRoom(): Promise<{ slug: string }> {
        return { slug: "human-readable-name" }
        // return fetchWithToken(`/api/rooms`, { method: "post" })
      },
    }
  }, [])
}
