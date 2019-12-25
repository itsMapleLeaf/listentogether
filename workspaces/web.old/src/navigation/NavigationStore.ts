import { action, observable } from "mobx"
import { ValueOf } from "../common/types"

export class Route<N extends string = string> {
  constructor(public readonly name: N, public readonly path: string) {}
}

export const appRoutes = {
  home: new Route("home", "/"),
  login: new Route("login", "/login"),
  signup: new Route("signup", "/signup"),
}

export type AppRoute = ValueOf<typeof appRoutes>

export class NavigationStore {
  @observable
  route: AppRoute = appRoutes.home

  @action.bound
  setRoute(route: AppRoute) {
    this.route = route
  }
}
