type HandlerMap = {
  [_ in string]?: (params: any) => void | Promise<void>
}

export function createMessageHandler(handlers: HandlerMap) {
  return async function handleMessage(message: any) {
    await handlers[message.type]?.(message.params)
  }
}
