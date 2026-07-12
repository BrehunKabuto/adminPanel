
import type React from "react"
import type { OrderItemResponseDto } from "../api/order.shema"
import { StatusLabel } from "./dashboard/statusLable"

export const OrderCard = (

    {
        children,
        className,
        id,
        clientName,
        OrderItems,
        priceVisible,
        status
    }:
    {
        children?: React.ReactNode
        className?: string
        id?: number,
        clientName: string,
        OrderItems: OrderItemResponseDto[],
        priceVisible?: boolean,
        status: string
        
    }
) => {

    

    return(

        <tr className={`${className} `} >
            {id && 
            <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
                <p>{id}</p>
            </td>
            }
            <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
            <p>{clientName}</p>
            </td>
            <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
            <p>{OrderItems.map(item => `${item.name} ${item.count > 1 ? item.count : ''}`).join(', ')}</p>
            </td>
            {priceVisible && (
                <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
                    <p>{OrderItems.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2)}$</p>
                </td>
            )}
            <StatusLabel status={status} />
            {children && children}
        </tr>
    )
}