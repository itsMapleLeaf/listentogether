import { raise } from "./raise"

export const assertDefined = <T>(value: T | undefined | null): T =>
  value ?? raise("value is not defined")
