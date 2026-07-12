import { Module } from '@nestjs/common';
import { AdminSeederCommand } from './commands/admin-seeder.command';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';


@Module({
imports: [PrismaModule, UserModule, ChatModule, AiModule],
  providers: [AdminSeederCommand],
})
export class CliModule {}
