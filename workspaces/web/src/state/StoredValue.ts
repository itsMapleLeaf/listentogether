import * as idb from "idb-keyval"

export class StoredValue<T> {
  constructor(private key: string) {}

  get() {
    return idb.get<T | undefined>(this.key)
  }

  set(value: T) {
    return idb.set(this.key, value)
  }
}
