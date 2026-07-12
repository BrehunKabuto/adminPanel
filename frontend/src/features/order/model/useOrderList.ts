import { useOrderStore } from "./Order.store"

export const useOrderList = () => {

    const getPage = useOrderStore((s) => s.getPage)
    const changeStatus = useOrderStore((s) => s.changeStatus)
    const deleteOrder = useOrderStore((s) => s.delete)
    const isLoading = useOrderStore((s) => s.isLoading)
    const getMyPage = useOrderStore((s) => s.getMyPage)
    return {getPage, changeStatus, deleteOrder, isLoading, getMyPage}
}