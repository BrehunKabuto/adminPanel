import { useUserStore } from "./user.store"

export const useRole = () => {

    const myRole = useUserStore((s) => s.myRole)
    const getRole = useUserStore((s) => s.getRole)

    return {getRole, myRole}
}