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

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  signup: AuthPayload,
  login: AuthPayload,
  createDraft: Post,
  deletePost?: Maybe<Post>,
  publish?: Maybe<Post>,
};


export type MutationSignupArgs = {
  name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateDraftArgs = {
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>
};


export type MutationDeletePostArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationPublishArgs = {
  id?: Maybe<Scalars['ID']>
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  published: Scalars['Boolean'],
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  author?: Maybe<User>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  feed: Array<Post>,
  filterPosts: Array<Post>,
  post?: Maybe<Post>,
};


export type QueryFilterPostsArgs = {
  searchString?: Maybe<Scalars['String']>
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  posts: Array<Post>,
};

export type HomeFeedQueryVariables = {};


export type HomeFeedQuery = (
  { __typename?: 'Query' }
  & { feed: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )> }
  )> }
);


export const HomeFeedDocument = gql`
    query homeFeed {
  feed {
    id
    title
    content
    author {
      name
    }
  }
}
    `;

/**
 * __useHomeFeedQuery__
 *
 * To run a query within a React component, call `useHomeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HomeFeedQuery, HomeFeedQueryVariables>) {
        return ApolloReactHooks.useQuery<HomeFeedQuery, HomeFeedQueryVariables>(HomeFeedDocument, baseOptions);
      }
export function useHomeFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HomeFeedQuery, HomeFeedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HomeFeedQuery, HomeFeedQueryVariables>(HomeFeedDocument, baseOptions);
        }
export type HomeFeedQueryHookResult = ReturnType<typeof useHomeFeedQuery>;
export type HomeFeedLazyQueryHookResult = ReturnType<typeof useHomeFeedLazyQuery>;
export type HomeFeedQueryResult = ApolloReactCommon.QueryResult<HomeFeedQuery, HomeFeedQueryVariables>;