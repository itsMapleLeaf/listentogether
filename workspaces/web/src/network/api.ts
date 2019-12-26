import { fetchJson, FetchJsonOptions } from "./fetchJson"

export function createApi(token: string) {
  function fetchWithToken(endpoint: string, options: FetchJsonOptions = {}) {
    return fetchJson(`http://localhost:4000/${endpoint.replace(/^\/+/, "")}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })
  }

  return {
    async createRoom(): Promise<{ roomId: string }> {
      return fetchWithToken(`/rooms`, { method: "post" })
    },
  }
}
