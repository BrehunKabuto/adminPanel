import { IsNumber, IsString } from "class-validator"

export class CreateOrderItemDto {

    @IsString()
    name!: string

    @IsNumber()
    count!: number

    @IsNumber()
    price!: number

}