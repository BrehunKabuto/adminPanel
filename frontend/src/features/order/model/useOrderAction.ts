import { useOrderList } from "./useOrderList"
import { OrderStatus } from "../../../shared/types/OrderStatus.enum"
import { useRole } from "../../user/model/useRole";
import { UserRoles } from "../../../shared/types/UserRoles.enum";


export function useOrderActions(
  OrderId: number,
   status: string,
   onStatusChange: (newStatus: string) => void,
  onDelete: () => void

) {
  const { changeStatus, deleteOrder } = useOrderList();
  const {myRole} = useRole()
  return [
    ...(status === OrderStatus.NEW ? [{
      title: "Take",
      onClick: async() => {
        await changeStatus({ OrderId, status: OrderStatus.IN_PROGRESS })
        onStatusChange(OrderStatus.IN_PROGRESS)
      },
    }] : []),
    ...(status === OrderStatus.IN_PROGRESS ? [
      {
        title: "Complete",
        onClick: async() => {
          await changeStatus({ OrderId, status: OrderStatus.COMPLETED })
          onStatusChange(OrderStatus.COMPLETED)
        },
      },
      {
        title: "Cancel",
        onClick: async() => {
          await changeStatus({ OrderId, status: OrderStatus.CANCELED })
          onStatusChange(OrderStatus.CANCELED)
        },
      },
    ] : []),
    ...((myRole === UserRoles.ADMIN && (status === OrderStatus.CANCELED || status === OrderStatus.COMPLETED) ) ?
  [{
    title: "Delete",
    onClick: async() =>{
      await  deleteOrder(OrderId)
      onDelete()
    }
  }] : [] )
  ];
}