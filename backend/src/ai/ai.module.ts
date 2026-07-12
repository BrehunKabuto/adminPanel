import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { OrderModule } from '@/order/order.module';
import { AiController } from './ai.controller';
import { ChatModule } from '@/chat/chat.module';

@Module({
    providers: [AiService],
    imports: [OrderModule],
    controllers: [AiController],
    exports: [AiService]
})
export class AiModule {}
