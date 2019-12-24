import createContextWrapper from "./react/createContextWrapper"
import { RootStore } from "./RootStore"

export const useRootStore = createContextWrapper(
  ({ store }: { store: RootStore }) => store,
)
export const RootStoreProvider = useRootStore.Provider
