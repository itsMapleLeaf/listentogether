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

export type Query = {
   __typename?: 'Query',
  room: Room,
};


export type QueryRoomArgs = {
  slug?: Maybe<Scalars['String']>
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