
import { useOrderStore } from "./Order.store"


export const useDashboard = () => {

    const getStats = useOrderStore((s) => s.getStats)
    const stats = useOrderStore((s) => s.stats) 
    return {getStats, stats}
}