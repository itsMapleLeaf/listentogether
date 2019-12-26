declare namespace Express {
  export interface Request {
    user?: {
      // auth0 user id
      // we don't really care about anything else
      sub: string
    }
  }
}
