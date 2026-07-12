import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { AiModule } from '@/ai/ai.module';

@Module({
    providers: [ChatService],
    imports: [PrismaModule, AiModule],
    exports: [ChatService],
    controllers: [ChatController]
})
export class ChatModule {}
