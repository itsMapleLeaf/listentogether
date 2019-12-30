import createContextWrapper from "../common/createContextWrapper"
import { AppStore } from "./AppStore"

export const useAppStore = createContextWrapper(
  ({ store }: { store: AppStore }) => store,
)
export const AppStoreProvider = useAppStore.Provider
