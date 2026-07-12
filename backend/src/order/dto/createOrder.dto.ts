import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import {Type} from "class-transformer"
import { CreateOrderItemDto } from "@/order-item/dto/createOrderItem.dto";

export class CreateOrderDto {

    @IsString()
    clientName!:string

    @IsOptional()
    @IsString()
    clientPhone?: string

    @IsOptional()
    @IsString()
    comment?: string

    

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOrderItemDto)
    items!: CreateOrderItemDto[]
}