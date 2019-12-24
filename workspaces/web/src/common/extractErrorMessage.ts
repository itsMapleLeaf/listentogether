import { isApolloError } from "apollo-boost"

export default function extractErrorMessage(error: unknown) {
  // @ts-ignore
  if (isApolloError(error)) {
    return error.graphQLErrors[0]?.message || error.message
  }
  return error instanceof Error ? error.message : String(error)
}
