type Track = {
  id: string
  youtubeUrl?: string | null
}

export type ClientCommand =
  | { type: "client-set-slug"; roomSlug: string }
  | { type: "client-request-tracks" }
  | { type: "client-add-track"; youtubeUrl: string }

export type ServerCommand = { type: "server-update-tracks"; tracks: Track[] }

export function parseCommand<TCommand>(data: unknown): TCommand {
  return JSON.parse(String(data))
}

export function createSendCommand<TCommand>(
  getSocket: () => WebSocket | undefined,
) {
  return function sendCommand(command: TCommand) {
    getSocket()?.send(JSON.stringify(command))
  }
}

export function createBroadcast<TCommand>(
  getClients: () => Iterable<WebSocket>,
) {
  return function broadcast(command: TCommand) {
    for (const client of getClients()) {
      client.send(JSON.stringify(command))
    }
  }
}
