import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { AiMessageDto } from './dto/aiMessage.dto';
import { AiService } from './ai.service';
import { CurrentUser } from '@/common/decorators/CurrentUser.decorator';
import type{ User } from '@/common/types/user.type';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {

}
