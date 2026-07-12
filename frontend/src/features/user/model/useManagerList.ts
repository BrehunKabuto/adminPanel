import { useUserStore } from "./user.store"

export const useManagerList = () => {

    const isLoading = useUserStore((s) => s.isLoading)
    const getPage = useUserStore((s) => s.getPage)
    const deleteManager = useUserStore((s) => s.delete)
    const getAll = useUserStore((s) => s.getAll)
    return{isLoading, getPage, deleteManager, getAll}
}