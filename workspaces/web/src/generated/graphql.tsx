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

export type Subscription = {
   __typename?: 'Subscription',
  room: Room,
};


export type SubscriptionRoomArgs = {
  slug: Scalars['String']
};

export type Track = {
   __typename?: 'Track',
  id: Scalars['ID'],
  youtubeUrl: Scalars['String'],
};

export type InitialRoomTracksQueryVariables = {
  slug: Scalars['String']
};


export type InitialRoomTracksQuery = (
  { __typename?: 'Query' }
  & { room: (
    { __typename?: 'Room' }
    & { tracks: Array<(
      { __typename?: 'Track' }
      & Pick<Track, 'id' | 'youtubeUrl'>
    )> }
  ) }
);

export type RoomTracksSubscriptionVariables = {
  slug: Scalars['String']
};


export type RoomTracksSubscription = (
  { __typename?: 'Subscription' }
  & { room: (
    { __typename?: 'Room' }
    & { tracks: Array<(
      { __typename?: 'Track' }
      & Pick<Track, 'id' | 'youtubeUrl'>
    )> }
  ) }
);
