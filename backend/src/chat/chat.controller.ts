import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AiMessageDto } from '@/ai/dto/aiMessage.dto';
import { CurrentUser } from '@/common/decorators/CurrentUser.decorator';
import type { User } from '@/common/types/user.type';
import { getPagesDto } from '@/common/dto/getPages.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { ROLE } from 'generated/prisma/enums';

@Controller('chat')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChatController {
    
    constructor (
        private readonly chatService: ChatService
    )
    {}

    @Post()
    @Roles(ROLE.ADMIN)
    async create(
        @Body() message: AiMessageDto,
        @CurrentUser() user: User
    ){
        return this.chatService.AiMessage(message.message, user.id)
    }

    @Get()
    async getPage(
        @Query() data: getPagesDto,
        @CurrentUser() user: User
    ){
        return this.chatService.getPage(user.id, data.page, data.limit)
    }

    

}
