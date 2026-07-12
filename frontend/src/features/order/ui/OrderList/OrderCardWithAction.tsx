import { useOrderActions } from "../../model/useOrderAction";
import { DropdownMenu } from "../../../../shared/ui/DropdownMenu";
import type { OrderResponseDto } from "../../api/order.shema";
import { OrderCard } from "../orderCard";

export  const OrderCardWithAction = (
    { order,
        updateOrder,
        removeOrder
     }
    : 
    { order: OrderResponseDto,
        updateOrder: (id: number, status: string) => void,
        removeOrder: (id: number) => void
     }
) =>{

     const actions = useOrderActions(order.id, order.status, (newStatus) => updateOrder(order.id,newStatus), () => removeOrder(order.id))
    return(
        <OrderCard
        className="grid-cols-5"
         id={order.id}
      clientName={order.clientName}
      priceVisible={true}
      OrderItems={order.items!}
      status={order.status}
        >
             <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
              {
                <DropdownMenu elements={actions}></DropdownMenu>
            }
            </td>
           
        </OrderCard>
    )
}