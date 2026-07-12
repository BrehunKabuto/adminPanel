import { getPagesDto } from "@/common/dto/getPages.dto";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetOrdersDto extends getPagesDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    managerId?: number
}