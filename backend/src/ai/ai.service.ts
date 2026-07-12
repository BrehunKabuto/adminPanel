import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { OrderService } from '@/order/order.service';
import { tools } from './tools/tools.index';
import { Response, ResponseInputItem } from 'openai/resources/responses/responses.js';
import { AiMessageDto } from './dto/aiMessage.dto';
import { ChatService } from '@/chat/chat.service';
import { MessageRole } from 'generated/prisma/enums';


@Injectable()
export class AiService {

     private openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY!
        })

    constructor(
        private readonly orderService: OrderService
        
    ){}

    async chat(message: AiMessageDto){
      
        try{
            let input: ResponseInputItem[]= [
                {
                    role: "user", content: message.message
                }
            ]
            const response = await this.openai.responses.create({
                model: "gpt-4o-mini",
                instructions:`You are an assistant for order management. Today's date is ${new Date().toISOString().split('T')[0]}. Use tools to answer the user's question.`,
                tools,
                input,
            })

           const handler = await this.responseHandler(response)

           if(handler){

               input.push(
                {
              type: 'function_call',
              call_id: handler.toolCall.call_id,
                name: handler.toolCall.name,
              arguments: handler.toolCall.arguments,
         },
               
        {
            type: "function_call_output",
            call_id: handler.toolCall.call_id!,
            output: JSON.stringify(handler.result)
        })
            
           const finalResponse = await this.openai.responses.create({
            model: "gpt-4o-mini",
            instructions: "You are an assistant for order management. Answer the user's question based on the tool results provided.",
            tools,
            input
           })
           
           return finalResponse.output_text
           }
       
        return response.output_text
        }
        catch(e){
            console.log("Ai Error:",e)
            throw new InternalServerErrorException("AI response failed")
        }
    }

    async responseHandler(response: Response){
        if(response.output[0].type === "function_call"){

            const toolCall = response.output[0]

            const handler = this.toolHandlers[toolCall.name]
            if (!handler) throw new InternalServerErrorException(`Unknown tool: ${toolCall.name}`)

            const args = JSON.parse(toolCall.arguments)
            const result = await handler(args)
            return {toolCall, result}
        }

    }

    private toolHandlers: Record<string, (arg: any) => Promise<any>> = {
        getOrderByStatus: (args: any) => this.orderService.getByStatus(args.status),
        getAllOrders: (args: any) => this.orderService.getAll(),
        getOrdersStats: (args: any) => this.orderService.getStats(),
        getOrdersByClient: (args: any) => this.orderService.getOrdersByClient(args.clientName),
        getOrdersByData: (args: any) => this.orderService.getOrderByDateDiapasone(args.from, args.to),
        getRevenueByData: (args: any) => this.orderService.getRevenueByDateDiapasone(args.from, args.to)
    }
}
