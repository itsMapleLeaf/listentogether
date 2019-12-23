import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import React from "react"
import { useRoutes } from "../navigation/routerContext"

const feedQuery = gql`
  {
    feed {
      id
      title
      content
      author {
        name
      }
    }
  }
`

function Home() {
  const { loading, error, data } = useQuery(feedQuery)
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
        {data?.feed.map((post: any) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>by {post.author.name}</p>
          </article>
        ))}
      </main>
    </>
  )
}

export default Home
