import { fetchJson, FetchJsonOptions } from "./fetchJson"

export function createApi(token: string) {
  function fetchWithToken(endpoint: string, options: FetchJsonOptions = {}) {
    return fetchJson(`http://localhost:4000/${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })
  }

  return {
    async createRoom() {
      return fetchWithToken(`/rooms`, { method: "post" })
    },
  }
}
