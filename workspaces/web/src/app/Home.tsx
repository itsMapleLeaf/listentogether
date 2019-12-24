import React from "react"
import { useHomeFeedQuery } from "../generated/graphql"
import Link from "../navigation/Link"
import { appRoutes } from "../navigation/NavigationStore"

type Props = {
  isAuthenticated: boolean
}

function Home(props: Props) {
  const { loading, error, data } = useHomeFeedQuery()
  return (
    <>
      {props.isAuthenticated ? (
        <nav>
          <button>log out</button>
        </nav>
      ) : (
        <nav>
          <Link to={appRoutes.login}>log in</Link> |{" "}
          <Link to={appRoutes.signup}>sign up</Link>
        </nav>
      )}
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
