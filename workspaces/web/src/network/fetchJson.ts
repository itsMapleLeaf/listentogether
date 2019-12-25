type JsonValue =
  | number
  | string
  | boolean
  | undefined
  | null
  | JsonValue[]
  | { [_ in string]: JsonValue }

type HeadersObject = {
  [_ in string]: string
}

type QueryObject = {
  [_ in string]: string | number | boolean | undefined | null
}

export type FetchJsonOptions = {
  method?: "get" | "post" | "patch" | "delete"
  headers?: HeadersObject
  query?: QueryObject
  body?: JsonValue
}

function getQueryString(queryObject: QueryObject) {
  const paramPairs = Object.entries(queryObject)
    .map(([key, value]) => {
      return value == null || value === false ? "" : `${key}=${value}`
    })
    .join("&")

  return `?${paramPairs}`
}

export async function fetchJson(url: string, options: FetchJsonOptions = {}) {
  const queryString = options.query ? getQueryString(options.query) : ""

  const fetchOptions: RequestInit = {
    method: options.method,
    headers: options.headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  }

  const response = await fetch(`${url}${queryString}`, fetchOptions)
  return response.json()
}
