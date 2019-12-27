import { ManagementClient } from 'auth0'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import * as env from './env'

export const authManagementClient = new ManagementClient({
  domain: env.AUTH0_DOMAIN,
  clientId: env.AUTH0_CLIENT_ID,
  clientSecret: env.AUTH0_CLIENT_SECRET,
  scope: 'read:users',
})

export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: env.AUTH0_AUDIENCE,
  issuer: `https://${env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})
