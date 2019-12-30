import { Track } from "./track"
import { ValueOf } from "./types"

export type SocketMessageMap = {
  // messages from client
  clientCreateRoom: undefined
  clientRequestTracks: { roomSlug: string }
  clientAddTrack: { roomSlug: string; youtubeUrl: string }

  // messages from server
  serverRoomCreated: { roomSlug: string }
  serverUpdateTracks: { roomSlug: string; tracks: Track[] }
}

type MessageType<T, P> = P extends undefined
  ? { type: T; params?: undefined } // makes destructuring easier
  : { type: T; params: P }

export type SocketMessage = ValueOf<
  { [K in keyof SocketMessageMap]: MessageType<K, SocketMessageMap[K]> }
>

type HandlerMap = {
  [K in keyof SocketMessageMap]?: (
    params: SocketMessageMap[K],
  ) => void | Promise<void>
}

export function createMessageHandler(handlers: HandlerMap) {
  return async function handleMessage(message: SocketMessage) {
    await handlers[message.type]?.(message.params as never) // lol
  }
}
