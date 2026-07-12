import z4 from "zod/v4";
import { UserShema } from "./user.shema";
import { OrderResponseShema } from "../../order/api/order.shema";

export const GetUserRequestShema = z4.object({
    ...UserShema.shape,
    orders: z4.array(OrderResponseShema).optional(),
   

})

export const GetAllUsersRequestShema = z4.array(GetUserRequestShema)

export type GetUserRequestDto = z4.infer<typeof GetUserRequestShema>

