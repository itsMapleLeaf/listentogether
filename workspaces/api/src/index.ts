import compression from 'compression'
import cors from 'cors'
import express from 'express'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

const checkJwt = jwt({
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

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(compression())
app.use(checkJwt)

app.post('/rooms', (req, res) => {
  res.send({
    msg: 'i love you',
  })
})

const port = Number(process.env.PORT) || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
