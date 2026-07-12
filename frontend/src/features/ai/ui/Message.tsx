import { MessageRoles } from "../../../shared/types/MessageRoles.type"
import type { AiResponseMessageDto } from "../api/ai.shema"

export const Message = (

    {message}:{message: AiResponseMessageDto} 
) => {

    return (
        <div className="w-full flex flex-col">
            <div className={`max-w-xs wrap-break-word
                 ${message.role === MessageRoles.USER ? "self-end" : "self-start"}`} >
                 <p className="text-text-primary bg-surface p-2 my-1.5 rounded-md">{message.content}</p>
            </div>
        </div>
    )
}