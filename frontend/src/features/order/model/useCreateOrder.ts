import { useOrderStore } from "./Order.store"

export const useCreateOrder = () => {

    const create = useOrderStore((s) => s.create)

    return {create}
}