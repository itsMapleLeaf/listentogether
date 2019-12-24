import { isApolloError } from "apollo-boost"

export function raise(error: string | Error): never {
  throw typeof error === "string" ? new Error(error) : error
}

export function extractErrorMessage(error: unknown) {
  // @ts-ignore
  if (isApolloError(error)) {
    return error.graphQLErrors[0]?.message || error.message
  }
  return error instanceof Error ? error.message : String(error)
}
