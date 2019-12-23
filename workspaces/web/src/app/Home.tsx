import React from "react"
import { useHomeFeedQuery } from "../generated/graphql"
import { useRoutes } from "../navigation/routerContext"

function Home() {
  const { loading, error, data } = useHomeFeedQuery()
  const routes = useRoutes()
  return (
    <>
      <nav>
        <a {...routes.login.link()}>log in</a> |{" "}
        <a {...routes.signup.link()}>sign up</a>
      </nav>
      <main>
        {loading && <p>loading...</p>}
        {error && <p>an error occurred</p>}
        {data?.feed.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>by {post.author?.name ?? "Unknown"}</p>
          </article>
        ))}
      </main>
    </>
  )
}

export default Home
