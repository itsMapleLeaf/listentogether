import createAuth0Client from "@auth0/auth0-spa-js"
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client"
import React, { useEffect, useState } from "react"

type Props = {}

function App(props: Props) {
  const [client, setClient] = useState<Auth0Client>()
  const [user, setUser] = useState()

  useEffect(() => {
    async function createClient() {
      const client = await createAuth0Client({
        domain: "kingdaro.auth0.com",
        client_id: "tD5PbNq3BlwfPSLhuAbV6DGvaON7Q6F1",
        redirect_uri: "http://localhost:3000/auth/callback",
      })

      if (window.location.pathname.startsWith(`/auth/callback`)) {
        await client.handleRedirectCallback()
        window.history.replaceState(undefined, document.title, "/")
      }

      const user = await client.getUser()
      if (user) setUser(user)

      setClient(client)
    }

    createClient()
  }, [])

  return (
    <main>
      {client ? (
        user ? (
          <>
            <code>{JSON.stringify(user)}</code>
            <button
              onClick={() =>
                client.logout({ returnTo: window.location.origin })
              }
            >
              log out
            </button>
          </>
        ) : (
          <button onClick={() => client.loginWithRedirect()}>log in</button>
        )
      ) : (
        <p>loading client...</p>
      )}
    </main>
  )
}

export default App
