import { create } from "zustand";
import type { AiRequestMessageDto, AiResponseMessageDto, GetAiMessagesPagesDto } from "../api/ai.shema";
import { AiApi } from "../api/ai.api";

interface AiStore  {

    isLoading: boolean
    chat: (data: AiRequestMessageDto) => Promise<AiResponseMessageDto | undefined>
    getPages: (page: number, limit: number) => Promise<GetAiMessagesPagesDto | undefined>
}

export const useAiStore = create<AiStore>((set)=> ({

    isLoading: false,
    aiResponse: null,
    chat: async(data) => {

        try{
            set({isLoading: true})
            const res = await AiApi.chat(data)
           return res
        }
        catch(e){
            console.log(e)
        }
        finally{

            set({isLoading: false})
        }
    },

    getPages: async(page: number, limit: number) => {
        try{

            set({isLoading: true})
            const res = await AiApi.getPage(page, limit)
            if (res) return res 
            
        }
        catch(e)
        {   
            console.error(e)
        }
        finally{
            set({isLoading: false})
        }
    }
}))