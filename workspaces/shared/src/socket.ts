import { Track } from "./track"
import { ValueOf } from "./types"

export type SocketMessageMap = {
  // messages from client
  clientCreateRoom: undefined
  clientJoinRoom: { slug: string }
  clientAddTrack: { youtubeUrl: string }

  // messages from server
  serverRoomCreated: { slug: string }
  // serverRoomJoined: { slug: string } // maybe not needed?
  serverUpdateTracks: { tracks: Track[] }
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

export function serializeMessage(message: SocketMessage) {
  return JSON.stringify(message)
}

export function deserializeMessage(data: unknown): SocketMessage {
  return JSON.parse(String(data))
}
