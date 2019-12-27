import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AddYouTubeTrackResult = {
   __typename?: 'AddYouTubeTrackResult',
  success: Scalars['Boolean'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addYouTubeTrack: AddYouTubeTrackResult,
};


export type MutationAddYouTubeTrackArgs = {
  roomSlug: Scalars['String'],
  youtubeUrl: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  room: Room,
};


export type QueryRoomArgs = {
  slug: Scalars['String']
};

export type Room = {
   __typename?: 'Room',
  tracks: Array<Track>,
};

export type Track = {
   __typename?: 'Track',
  id: Scalars['ID'],
  youtubeUrl: Scalars['String'],
};

export type AddYouTubeTrackMutationVariables = {
  roomSlug: Scalars['String'],
  youtubeUrl: Scalars['String']
};


export type AddYouTubeTrackMutation = (
  { __typename?: 'Mutation' }
  & { addYouTubeTrack: (
    { __typename?: 'AddYouTubeTrackResult' }
    & Pick<AddYouTubeTrackResult, 'success'>
  ) }
);

export type RoomTracksQueryVariables = {
  slug: Scalars['String']
};


export type RoomTracksQuery = (
  { __typename?: 'Query' }
  & { room: (
    { __typename?: 'Room' }
    & { tracks: Array<(
      { __typename?: 'Track' }
      & Pick<Track, 'id' | 'youtubeUrl'>
    )> }
  ) }
);


export const AddYouTubeTrackDocument = gql`
    mutation AddYouTubeTrack($roomSlug: String!, $youtubeUrl: String!) {
  addYouTubeTrack(roomSlug: $roomSlug, youtubeUrl: $youtubeUrl) {
    success
  }
}
    `;
export type AddYouTubeTrackMutationFn = ApolloReactCommon.MutationFunction<AddYouTubeTrackMutation, AddYouTubeTrackMutationVariables>;

/**
 * __useAddYouTubeTrackMutation__
 *
 * To run a mutation, you first call `useAddYouTubeTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddYouTubeTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addYouTubeTrackMutation, { data, loading, error }] = useAddYouTubeTrackMutation({
 *   variables: {
 *      roomSlug: // value for 'roomSlug'
 *      youtubeUrl: // value for 'youtubeUrl'
 *   },
 * });
 */
export function useAddYouTubeTrackMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddYouTubeTrackMutation, AddYouTubeTrackMutationVariables>) {
        return ApolloReactHooks.useMutation<AddYouTubeTrackMutation, AddYouTubeTrackMutationVariables>(AddYouTubeTrackDocument, baseOptions);
      }
export type AddYouTubeTrackMutationHookResult = ReturnType<typeof useAddYouTubeTrackMutation>;
export type AddYouTubeTrackMutationResult = ApolloReactCommon.MutationResult<AddYouTubeTrackMutation>;
export type AddYouTubeTrackMutationOptions = ApolloReactCommon.BaseMutationOptions<AddYouTubeTrackMutation, AddYouTubeTrackMutationVariables>;
export const RoomTracksDocument = gql`
    query RoomTracks($slug: String!) {
  room(slug: $slug) {
    tracks {
      id
      youtubeUrl
    }
  }
}
    `;

/**
 * __useRoomTracksQuery__
 *
 * To run a query within a React component, call `useRoomTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomTracksQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRoomTracksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RoomTracksQuery, RoomTracksQueryVariables>) {
        return ApolloReactHooks.useQuery<RoomTracksQuery, RoomTracksQueryVariables>(RoomTracksDocument, baseOptions);
      }
export function useRoomTracksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RoomTracksQuery, RoomTracksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RoomTracksQuery, RoomTracksQueryVariables>(RoomTracksDocument, baseOptions);
        }
export type RoomTracksQueryHookResult = ReturnType<typeof useRoomTracksQuery>;
export type RoomTracksLazyQueryHookResult = ReturnType<typeof useRoomTracksLazyQuery>;
export type RoomTracksQueryResult = ApolloReactCommon.QueryResult<RoomTracksQuery, RoomTracksQueryVariables>;