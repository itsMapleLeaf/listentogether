/**
 * an idea: safely catch an error from a promise and return it in a tuple, go style
 */
async function pwrap<T>(promise: Promise<T>): Promise<readonly [T?, Error?]> {
  try {
    return [await promise, undefined]
  } catch (error) {
    return [undefined, error]
  }
}
export { pwrap }
