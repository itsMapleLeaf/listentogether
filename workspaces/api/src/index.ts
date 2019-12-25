import express from 'express'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from './env'

const app = express()

const authConfig = {
  domain: AUTH0_DOMAIN,
  audience: AUTH0_AUDIENCE,
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256'],
})

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!',
  })
})

const port = Number(process.env.PORT) || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
