import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderItemService } from '@/order-item/order-item.service';
import { changeStatusOrderDto } from './dto/changeStatusOrder.dto';
import { OrderStatus } from 'generated/prisma/enums';
import { take } from 'rxjs';
import { GetOrdersDto } from './dto/getOrders.dto';
import { BuildOrderWhere } from './utils/buidOrderWhere';


@Injectable()
export class OrderService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly orderItemService: OrderItemService

    ){}

    async create(orderData: CreateOrderDto, managerId: number){
        
        try {
      
           const order = await this.prisma.order.create({
                data: {
                    clientName: orderData.clientName,
                    clientPhone: orderData.clientPhone,
                    comment: orderData.comment,
                    managerId
                },
                include: {items: true}
            })  
              await Promise.all(
                orderData.items.map((item) => this.orderItemService.create(order.id,item))
            )
           
            return order
        }
        catch(e){
            throw new InternalServerErrorException("failed create order")
        }
    }

    async changeStatus(orderData: changeStatusOrderDto){
        try{

            const order = await this.prisma.order.update({
                where: {
                    id: orderData.OrderId
                },
                data: {
                    status: orderData.status
                },
                select: {
                    clientName: true,
                    id: true,
                    clientPhone: true,
                    comment: true,
                    createAt: true,
                    status: true,
                    items: true
                }
            })

            return order
        }
        catch(e){
            throw new InternalServerErrorException("failed change order state")
        }
    }

    async getAll(){

        try{

            return await this.prisma.order.findMany({
                include: {
                    items: true,
                    manager: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true
                        }

                    }
                }
                
            })
        }
        catch(e){
            throw new InternalServerErrorException("get all is failed")
        }
    }

    async getById(id: number){

       try
       { return await this.prisma.order.findMany({
        where: {id},
            include:{
                items: true
            }
        })
    }
    catch(e){
        throw new InternalServerErrorException("order not found")
    }
    }

    async deleteById(id: number){

        try{

            await this.prisma.order.delete({
                where: {id}
            })

            
        }
        catch(e){

            throw new InternalServerErrorException("order not found")
        }
    }

    async getByStatus(status: OrderStatus){

        try{
            return await this.prisma.order.findMany({
                where:{
                    status
                }
            })
        }
        catch(e){
            console.log("get status Error",e)
            throw new InternalServerErrorException("orders not found")
        }
    }

    async getStats() {
        
        const [NEW, IN_PROGRESS, COMPLETED, CANCELED] = await Promise.all([
           this.prisma.order.count({ where: { status: 'NEW' } }),
            this.prisma.order.count({ where: { status: 'IN_PROGRESS' } }),
    this.prisma.order.count({ where: { status: 'COMPLETED' } }),
    this.prisma.order.count({ where: { status: 'CANCELED' } }),
        ])

        const revenue = await this.prisma.orderItem.aggregate({
            _sum:   {price: true},
            where: {
                order:{
                    status: "COMPLETED"
                }
            }
        })

        return {NEW,
        IN_PROGRESS,
        COMPLETED,
        CANCELED ,
        totalRevenue: revenue._sum.price ?? 0
        }
        
    }

    async getOrdersByClient(clientName: string){
        try{

            return await this.prisma.order.findMany({
                where: {clientName:{
                    mode: "insensitive",
                    equals: clientName
                }}
            })
        }
        catch(e){
            throw new InternalServerErrorException("orders with this client not find")
        }
    }

    async getOrderByDateDiapasone(gte: string, lte: string){
        
        try{
              const end = new Date(lte)
            end.setHours(23, 59, 59, 999) 
            return await this.prisma.order.findMany({
                where: {
                    createAt: {
                        gte: new Date(gte),
                        lte: end
                        
                    }
                }
            })
        }
        catch(e){

            throw new InternalServerErrorException("order not found")
        }
    }

    async getRevenueByDateDiapasone(gte: string, lte: string){

        try{
            const end = new Date(lte)
            end.setHours(23, 59, 59, 999) 
            const result = await this.prisma.orderItem.aggregate({
                _sum: {price: true},
                where: {
                    order: {
                        status: "COMPLETED",
                        createAt: {
                            gte: new Date(gte),
                            lte: end
                        }
                    }
                }
            })
            
             return { revenue: result._sum.price ?? 0, from: gte, to: lte };
        }
        catch(e){
            throw new InternalServerErrorException("failed to get revenue")
        }
    }

    async getPage(data: GetOrdersDto){

        const page = data.page
        const limit = data.limit

         const skip = (page - 1) * limit;
  
        const where = BuildOrderWhere(data)

    const orders = await  this.prisma.order.findMany({
      skip,
      where,
      take: limit ,
      orderBy: { createAt: 'desc' },
      include: { items: true },
    })
   

  return {
    hasMore: orders.length > limit,
    orders: orders.slice(0, limit),
    page,
    limit,
    
  }
    
}
}
