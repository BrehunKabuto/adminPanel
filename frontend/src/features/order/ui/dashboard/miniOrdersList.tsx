import { useEffect, useState } from "react"
import { useOrderList } from "../../model/useOrderList"
import { OrderCard } from "../orderCard"
import type { OrderResponseDto } from "../../api/order.shema"

export  const MiniOrdersList = () => {
        const {getPage} = useOrderList()
        const [allOrders, setAllOrders] = useState<OrderResponseDto[]>([])
        useEffect( () => {
          const load = async() => {
            
            const res = await getPage({page: 1, limit: 10})
            if (!res) return
            setAllOrders(res.orders)
          }

        load()
        }, [])

       
      return (

       <table className="w-full table-fixed border-separate border-spacing-y-2">
        <thead>

           <tr className="text-text-secondary">
             <th className="text-center py-2">Client Name</th>
             <th className="text-center py-2">Items</th>
             <th className="text-center py-2">Status</th>
           </tr>
        </thead>
       <tbody>
           {allOrders.map(order => (
             <OrderCard key={order.id} OrderItems={order.items ?? []} clientName={order.clientName}
             status={order.status} />
            ))}
       </tbody>
       </table>
      )

} 