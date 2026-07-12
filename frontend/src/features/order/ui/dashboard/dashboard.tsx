import { useEffect } from "react"
import { useDashboard } from "../../model/useDashboard"
import { StatsCard } from "./statsCard"
import { MiniOrdersList } from "./miniOrdersList" 

export const Dashboard = () => {

    const {getStats, stats} = useDashboard()

    useEffect(() => {
        getStats()
    }, [])
    if(stats){

        return(
        <div className="w-full h-full">
            <h1 className="py-4 text-2xl font-extrabold ">Dashboard</h1>
            <div className="w-full h-full flex flex-col gap-4 grid-cols-3">
            <div 
            className="grid grid-cols-3 gap-4">

            <StatsCard title="New Orders" value={stats.NEW} />
            <StatsCard title="Orders In Progress" value={stats.IN_PROGRESS} />
            <StatsCard title="Revenue" value={stats.totalRevenue} />
            </div>
            <p className="py-2 text-2xl font-bold">Last Orders</p>
              <MiniOrdersList />
            </div>
        </div>
        )
    }
    else{
        <p>
            Loading...
        </p>
    }


}