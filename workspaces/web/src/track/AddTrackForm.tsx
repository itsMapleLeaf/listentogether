import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"
import { extractErrorMessage } from "../common/extractErrorMessage"
import {
  AddYouTubeTrackMutation,
  AddYouTubeTrackMutationVariables,
} from "../generated/graphql"

type Props = {
  roomSlug: string
}

const addYouTubeTrack = gql`
  mutation AddYouTubeTrack($roomSlug: String!, $youtubeUrl: String!) {
    addYouTubeTrack(roomSlug: $roomSlug, youtubeUrl: $youtubeUrl) {
      success
    }
  }
`

function AddTrackForm({ roomSlug }: Props) {
  const [newTrackUrl, setNewTrackUrl] = useState("")

  const [addTrack, { loading, error }] = useMutation<
    AddYouTubeTrackMutation,
    AddYouTubeTrackMutationVariables
  >(addYouTubeTrack)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await addTrack({
        variables: {
          roomSlug,
          youtubeUrl: newTrackUrl,
        },
      })
    } catch {}

    setNewTrackUrl("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <input
          type="text"
          placeholder="Add a youtube URL..."
          value={newTrackUrl}
          onChange={(e) => setNewTrackUrl(e.target.value)}
        />
        <button type="submit">add</button>
      </fieldset>
      {error && <p>could not add track: {extractErrorMessage(error)}</p>}
    </form>
  )
}

export default AddTrackForm
