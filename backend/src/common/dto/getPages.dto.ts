import { Type } from "class-transformer";
import { IsNumber } from "class-validator";


export class getPagesDto {

    @Type(() => Number)
  @IsNumber()
  page!: number;

  @Type(() => Number)
  @IsNumber()
  limit!: number;
}