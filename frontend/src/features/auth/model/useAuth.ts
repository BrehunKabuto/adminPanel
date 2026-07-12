import { useAuthStore } from "./Auth.store"

export const useAuth = () => {

    const isLoading = useAuthStore((s) => s.isLoading)
    const login = useAuthStore((s) => s.login)
    const logout = useAuthStore((s) => s.loguot)

    return { isLoading, login, logout}
}