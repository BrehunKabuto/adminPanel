import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ChatModule } from '@/chat/chat.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, ChatModule],
  exports: [UserService]
})
export class UserModule {}
