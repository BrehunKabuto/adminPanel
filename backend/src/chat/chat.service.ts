import { AiService } from '@/ai/ai.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageRole } from 'generated/prisma/enums';

@Injectable()
export class ChatService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService
    ) {}

    async getChatByUser(userId: number){
        try {
            return await this.prisma.chat.findUnique({
                where: {
                    userId
                }
            })

        }catch(e){

            throw new InternalServerErrorException("chat not found")
        }
    }

    async create(userId: number){
        try{
            await this.prisma.chat.create({
                data: {
                    userId: userId
                }
            })
        }
        catch(e){
            console.log('chat error:', e);
            throw new InternalServerErrorException("chat create is failed")
        }
    }

    async createMessage(message : string, role: MessageRole, userId: number){

        try{
            const chat =await this.getChatByUser(userId)
            return await this.prisma.aiMessage.create({
                data: {
                    content: message,
                    role: role,
                    chatId: chat?.id!
                }
            })
        }
        catch(e){

            throw new InternalServerErrorException("failed to create message")
        }
    }

    async getPage(userId: number, page: number, limit: number){
        try{
            const skip = (page -1) * limit

            const messages =  await this.prisma.aiMessage.findMany({
                where: {
                    chat: {
                        userId
                    }
                },
                skip,
                take: limit + 1,
                orderBy: {createdAt: "asc"},

            })

            return {
                hasMore: messages.length > limit,
                messages: messages.slice(0, limit)
            }
        }
        catch(e){
            throw new InternalServerErrorException("get massage is failed")
        }
    }

    async AiMessage(message : string, userId: number){
       
            await this.createMessage(message, MessageRole.USER, userId)
            const res = await this.aiService.chat({message})
            const aiMessage =  await this.createMessage(res, MessageRole.AI, userId)
            return aiMessage
          
    }
}
