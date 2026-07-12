import { IsEnum, IsNumber } from "class-validator";
import { OrderStatus } from "generated/prisma/enums";


export class changeStatusOrderDto {

    @IsNumber()
    OrderId!: number

    @IsEnum(OrderStatus)
    status!: OrderStatus 

}