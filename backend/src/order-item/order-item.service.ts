import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/createOrderItem.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class OrderItemService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    async create(orderId: number,itemData: CreateOrderItemDto){

        try{

            await this.prisma.orderItem.create({
                data: {
                   count: itemData.count,
                   name: itemData.name,
                   price: itemData.price,
                   orderId
                }
            })
        }
        catch(e){

            throw new InternalServerErrorException("failed to create item")
        }
    }

    async deleteByOrderId(orderId: number){

        try{

            await this.prisma.orderItem.deleteMany({
                where: {orderId}
            })
        }   
        catch(e){
            throw new InternalServerErrorException("failed to delete items")
        }
    }

    
}
