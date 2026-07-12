import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';
import { changeStatusOrderDto } from './dto/changeStatusOrder.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { ROLE } from 'generated/prisma/enums';
import { CurrentUser } from '@/common/decorators/CurrentUser.decorator';
import { type User } from '@/common/types/user.type';
import { getPagesDto } from '../common/dto/getPages.dto';
import { GetOrdersDto } from './dto/getOrders.dto';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {

    constructor (
        private readonly orderService: OrderService
    ){}

    @Post()
    async create(
        @Body() orderData: CreateOrderDto,
        @CurrentUser() user: User
    ){

        return await this.orderService.create(orderData, user.id)
    }

    @Post("changeStatus")
    async changeStatus(@Body() orderData: changeStatusOrderDto){

        return await this.orderService.changeStatus(orderData)
    }


    @Get("all")
    async getAll(){
        return await this.orderService.getAll()
    }

    @Roles(ROLE.ADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string){
        return await this.orderService.deleteById(+id)
    }

    @Roles(ROLE.ADMIN)
    @Get("stats")
    async getStats(){
        return await this.orderService.getStats()
    }

    @Roles(ROLE.ADMIN)
    @Get("page")
    async getPage(@Query() data: GetOrdersDto){
        
        return  await this.orderService.getPage(data)
    }

    @Get("myOrderPage")
    async getMyOrderPage(
        @Query() data: getPagesDto,
        @CurrentUser() user: User 
){
    const newData = {
        ...data,
        managerId: user.id
    }
    return  await this.orderService.getPage(newData)
    }
}
