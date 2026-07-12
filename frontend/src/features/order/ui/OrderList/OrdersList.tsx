import { useEffect, useRef, useState } from "react"
import { useOrderList } from "../../model/useOrderList"
import type { OrderResponseDto } from "../../api/order.shema"
import { OrderCardWithAction } from "./OrderCardWithAction"
import { mergeById } from "../../../../shared/utils/margeById"
import { ManagerSelect } from "../../../user/ui/ManagerSelect"
import { useLocation } from "react-router-dom"
import type { UserDto } from "../../../user/api/user.shema"
import { useRole } from "../../../user/model/useRole"
import { UserRoles } from "../../../../shared/types/UserRoles.enum"

export  const OrdersList = () => {

        const location = useLocation()
        const manager = location.state

        const {myRole} = useRole()
        const {getPage, deleteOrder, isLoading, getMyPage} = useOrderList()
        const [allOrders, setAllOrders] = useState<OrderResponseDto[]>([])
        const [hasMore, setHasMore] = useState(false)
        const [page,setPage] = useState(1)
        const [selectedManager, setSelectedManager] = useState<UserDto | null>(manager ?? null)
  
        const loadMoreRef = useRef<HTMLTableRowElement>(null);

         const load = async() => { 

          if(!myRole) return
          const data = {page,
               limit: 10,
               managerId: selectedManager?.id
              }
          let res  
          myRole === UserRoles.ADMIN ?
             res = await getPage(data) :
            res = await getMyPage(data)
            if(res){
              setAllOrders(prev =>mergeById(prev, res.orders, ))
              setHasMore(res.hasMore)

            }
      }
 
      const clearOrders = async() =>{
        setAllOrders([])
        setPage(1)
        load()
      }
      const removeOrder = async(id: number) => {
        await deleteOrder(id)
  setAllOrders(prev => prev.filter(o => o.id !== id));
};
      const updateOrder = (id: number, status: string) => {
  setAllOrders(prev => {
    const index = prev.findIndex(o => o.id === id)
    if (index === -1) return prev
    const updated = [...prev]
    updated[index] = { ...updated[index], status }
    return updated;
  })
}
        useEffect(() => {
         const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !isLoading && hasMore) {
                setPage(page + 1)
            }
        },
        {
            threshold: 1,
        }
    );

    if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
    }, [isLoading, hasMore, page])

      useEffect(() => {load()}, [page, myRole])   
      useEffect(() => {load()}, [])       
      useEffect(() => {clearOrders()}, [selectedManager])
      return (
      
      <div className="w-full h-full">
       <div>
          <h1 className="py-4 text-2xl font-extrabold flex flex-col">Orders</h1>
          {myRole === UserRoles.ADMIN &&
         <ManagerSelect selected={selectedManager} setSelected={setSelectedManager}/>
         }
       </div>
<table className=" w-full border-separate table-fixed border-spacing-y-2">
<thead>

    <tr className="text-text-secondary">
      <th className="text-center py-2">ID</th>
      <th className="text-center py-2">Client Name</th>
      <th className="text-center py-2">Items</th>
      <th className="text-center py-2">Price</th>
      <th className="text-center py-2">Status</th>
      <th className="text-center py-2"> Action</th>
    </tr>
</thead>
 <tbody>
    {allOrders.map(order => (
      <OrderCardWithAction
       key={order.id}
        order={order}
        removeOrder={removeOrder}
        updateOrder={updateOrder}
        />
    ))}
    <tr ref={loadMoreRef}/>
</tbody>
 
</table>
      </div>
        
      )

} 
