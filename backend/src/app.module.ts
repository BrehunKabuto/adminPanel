import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/catchEverithing.filter';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { AiModule } from './ai/ai.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    UserModule,
     PrismaModule,
      AuthModule,
       TokenModule,
        OrderModule,
         OrderItemModule,
          AiModule,
          ChatModule
        ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    ChatService
  ],
})
export class AppModule {}
