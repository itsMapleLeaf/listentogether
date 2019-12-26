import createContextWrapper from "../common/createContextWrapper"
import { AuthUser } from "./useAuth"

export const useAuthUserContext = createContextWrapper(
  ({ user }: { user: AuthUser }) => user,
)
export const AuthUserProvider = useAuthUserContext.Provider
