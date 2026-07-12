import { apiClient } from "../../../shared/api/apiClient"
import { AiResponseMessageShema, GetAiMessagePagesShema, type AiRequestMessageDto } from "./ai.shema"


export const AiApi = {

    chat: async(data: AiRequestMessageDto) => {

        const res = await apiClient.post("chat",data)
        return AiResponseMessageShema.parse(res.data)
    },

    getPage: async(page: number, limit: number) => {
        const res = await apiClient.get("chat", {
            params: {page, limit}
        })
        return GetAiMessagePagesShema.parse(res.data)
    }
}