import ApolloClient from "apollo-boost"
import { AuthStore } from "./auth/AuthStore"
import { storedToken } from "./auth/storedToken"
import { NavigationStore } from "./navigation/NavigationStore"

export class RootStore {
  apolloClient = new ApolloClient({
    uri: "http://localhost:4000",
    request: async (operation) => {
      const token = await storedToken.get()
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      })
    },
  })

  navigation = new NavigationStore()
  auth = new AuthStore(this.navigation, this.apolloClient)
}
