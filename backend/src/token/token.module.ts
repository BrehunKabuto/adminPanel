import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';

@Module({
  providers: [TokenService],
  imports: [JwtModule.register({}), PrismaModule, UserModule],
  exports: [TokenService]
})
export class TokenModule {}
