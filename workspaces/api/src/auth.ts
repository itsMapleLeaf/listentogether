import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://kingdaro.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://api.listentogether.com',
  issuer: 'https://kingdaro.auth0.com/',
  algorithms: ['RS256'],
})
