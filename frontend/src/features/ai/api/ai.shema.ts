import z4 from "zod/v4";
import { MessageRoles } from "../../../shared/types/MessageRoles.type";


export const AiRequestMessageShema = z4.object({

    message: z4.string()
})

export const AiResponseMessageShema = z4.object({
    content: z4.string(),
    chatId: z4.number().optional(),
    id: z4.number(),
    role: z4.enum(MessageRoles)

})

export const GetAiMessagePagesShema = z4.object({
    messages: z4.array(AiResponseMessageShema),
    hasMore: z4.boolean()
})
export type AiRequestMessageDto = z4.infer<typeof AiRequestMessageShema>
export type AiResponseMessageDto = z4.infer<typeof AiResponseMessageShema>
export type GetAiMessagesPagesDto = z4.infer<typeof GetAiMessagePagesShema>
