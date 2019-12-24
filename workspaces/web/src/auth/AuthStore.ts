import { ApolloClient } from "apollo-boost"
import { observable } from "mobx"
import { extractErrorMessage, raise } from "../common/errors"
import {
  BasicUserInfoDocument,
  BasicUserInfoQuery,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  User,
} from "../generated/graphql"
import { appRoutes, NavigationStore } from "../navigation/NavigationStore"
import { storedToken } from "./storedToken"

type AuthState =
  | { type: "loading" }
  | { type: "unauthenticated" }
  | { type: "authenticated"; user: Pick<User, "name"> }

type LoginState =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; error: string }

export class AuthStore {
  @observable
  authState: AuthState = { type: "loading" }

  @observable
  loginState: LoginState = { type: "idle" }

  constructor(
    private navigation: NavigationStore,
    private client: ApolloClient<unknown>,
  ) {}

  async getAuthState() {
    const user = await this.getUserInfo()
    this.authState = user
      ? { type: "authenticated", user }
      : { type: "unauthenticated" }
  }

  async login(variables: LoginMutationVariables) {
    if (this.loginState.type === "loading") return
    this.loginState = { type: "loading" }

    try {
      const result = await this.client.mutate<LoginMutation>({
        mutation: LoginDocument,
        variables,
      })

      const { token, user } =
        result.data?.login ?? raise("login info not found")

      storedToken.set(token)

      this.authState = { type: "authenticated", user }
      this.loginState = { type: "idle" }
      this.navigation.setRoute(appRoutes.home)
    } catch (error) {
      this.loginState = { type: "error", error: extractErrorMessage(error) }
    }
  }

  private async getUserInfo() {
    try {
      const result = await this.client.query<BasicUserInfoQuery>({
        query: BasicUserInfoDocument,
      })
      return result.data.me
    } catch (error) {
      console.warn("auth init error", error)
    }
  }
}
