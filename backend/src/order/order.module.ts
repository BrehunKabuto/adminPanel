import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { OrderItemModule } from '@/order-item/order-item.module';
import { OrderController } from './order.controller';

@Module({
  providers: [OrderService],
  imports: [PrismaModule, OrderItemModule],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
