import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
    providers:[OrderItemService],
    exports: [OrderItemService],
    imports: [PrismaModule]
})
export class OrderItemModule {}
