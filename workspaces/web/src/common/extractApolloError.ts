import { ApolloError } from "apollo-boost"

export default function extractApolloError(error: ApolloError) {
  return error.graphQLErrors[0]?.message || error.message
}
