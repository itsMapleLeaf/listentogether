export default function raise(error?: unknown): never {
  throw typeof error === "string" ? new Error(error) : error
}
