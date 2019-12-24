import { useLocalStore } from "mobx-react-lite"
import createContextWrapper from "../react/createContextWrapper"
import { NavigationStore } from "./NavigationStore"

export const useNavigationContext = createContextWrapper(() => {
  return useLocalStore(() => new NavigationStore())
})

export const NavigationProvider = useNavigationContext.Provider
