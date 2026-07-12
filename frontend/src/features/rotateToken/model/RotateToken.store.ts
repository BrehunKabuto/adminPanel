import { create } from "zustand";
import { RotateTokenApi } from "../api/rotateToken.api";


interface RotateTokenStore {

    isRefreshing: boolean,
    rotate: () => Promise<string | undefined>
}  


export const useRotateTokenStore = create<RotateTokenStore>((set) => ({

    
    isRefreshing: false,
    rotate: async() => {

       try{
       
         set({isRefreshing: true})
        const res = await RotateTokenApi.refresh()
        return res.accessToken

       }
       catch(e: any){
        if(e.response?.status !== 401){
            
            console.log(e)
        }
       }
       finally{
        set({isRefreshing: false})
       }

    }

   
})

)
