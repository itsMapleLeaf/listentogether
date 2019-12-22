export default function raise(error?: unknown) {
  throw typeof error === "string" ? new Error(error) : error
}
