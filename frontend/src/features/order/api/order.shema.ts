import z4 from "zod/v4";
import { OrderStatus } from "../../../shared/types/OrderStatus.enum";

export const OrderItemResponseShema = z4.object({
    id: z4.number(),
  name: z4.string(),
  count: z4.number(),
  price: z4.number(),
  orderId: z4.number(),
})

export const CreateOrderItemShema = z4.object({
    name: z4.string({error:"name not valid"} ),
    count: z4.number({error:"count not valid"} ),
    price: z4.number({error:"price not valid"} )
})

export const CreateOrderShema = z4.object({
     items: z4.array(CreateOrderItemShema),
    clientName: z4.string({error:"client name not valid"}),
    clientPhone: z4.string().optional(),
    comment: z4.string().optional(),
})

export const ChangeStatusOrderShema = z4.object({

    OrderId: z4.number(),
    status: z4.enum(OrderStatus)
})

export const OrderResponseShema = z4.object({
 
    clientName: z4.string(),
    clientPhone: z4.string().optional().nullable(),
    comment: z4.string().optional().nullable(),
    createAt: z4.string(),
    updateAt: z4.string().optional(),
    id: z4.number(),
    status: z4.enum(OrderStatus),
    managerId: z4.number().optional(),
    items: z4.array(OrderItemResponseShema).optional()   
})


export const GetStatsShema = z4.object({

    NEW:z4.number(),
    IN_PROGRESS:z4.number(),
    COMPLETED:z4.number(),
    CANCELED:z4.number(),
    totalRevenue:z4.number(),
})
export const GetPagesShema = z4.object({

    page: z4.number(),
    limit: z4.number(),
    managerId: z4.number().optional()
})
export const GetPageOrdersResponse = z4.object({
    orders: z4.array(OrderResponseShema),
    page: z4.number(),
    limit: z4.number(),
    hasMore: z4.boolean()
}) 
    
export type OrderItemResponseDto = z4.infer<typeof OrderItemResponseShema>
export type CreateOrderItemDto = z4.infer<typeof CreateOrderItemShema>
export type PageOrdersDto = z4.infer<typeof GetPageOrdersResponse>
export type CreateOrderDto = z4.infer<typeof CreateOrderShema>
export type ChangeOrderStatusDto = z4.infer<typeof ChangeStatusOrderShema>
export type OrderResponseDto = z4.infer<typeof OrderResponseShema>
export type StatsDto = z4.infer<typeof GetStatsShema>
export type GetPagesDto = z4.infer<typeof GetPagesShema>