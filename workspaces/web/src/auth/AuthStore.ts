import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import { History } from "history"
import { observable } from "mobx"
import { assertDefined } from "../common/assertDefined"

type AuthStatus =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "anonymous" }
  | { type: "authenticated"; user: AuthUser }

type AuthUser = {
  name: string
  picture: string
}

const redirectUri = assertDefined(process.env.REACT_APP_AUTH0_REDIRECT_URI)

export class AuthStore {
  @observable.ref
  status: AuthStatus = { type: "loading" }

  private client?: Auth0Client

  constructor(private history: History) {}

  getAuthStatus = async () => {
    let client: Auth0Client
    try {
      client = this.client = await createAuth0Client({
        client_id: assertDefined(process.env.REACT_APP_AUTH0_CLIENT_ID),
        domain: assertDefined(process.env.REACT_APP_AUTH0_DOMAIN),
        // audience: assertDefined(process.env.REACT_APP_AUTH0_AUDIENCE),
        redirect_uri: redirectUri,
      })
    } catch (error) {
      console.error(error)
      this.status = {
        type: "error",
        error: "an error occurred while authenticating",
      }
      return
    }

    try {
      const redirectPath = new URL(redirectUri).pathname
      if (this.history.location.pathname === redirectPath) {
        const { appState } = await client.handleRedirectCallback()
        this.history.replace(appState.redirectPath)
      }
    } catch (error) {
      console.error(error)
    }

    if (await client.isAuthenticated()) {
      const user = await client.getUser()
      this.status = { type: "authenticated", user }
    } else {
      this.status = { type: "anonymous" }
    }
  }

  login = () => {
    this.client?.loginWithRedirect({
      appState: {
        redirectPath: this.history.location.pathname,
      },
    })
  }

  logout = () => {
    this.client?.logout()
  }
}
