import { create } from "zustand";
import type { LoginFormDto } from "../api/loginForm.shema";
import { AuthApi } from "../api/auth.api";
import type { AccessTokenDto } from "../../rotateToken/api/accessToken.shema";

interface AuthStore  {

    isLoading: boolean,
    login: (data: LoginFormDto) => Promise<AccessTokenDto | undefined>,
    loguot: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({

    isLoading: false,
    accessToken: null,

    login: async(data) => {
        
        try{
            set({isLoading: true})
            const res =await AuthApi.login(data)
           
            return res
        }
        catch(e){   
            console.log(e)
        }
        finally{

            set({isLoading: false})
        }
    },
    loguot: async() => {
        try{
            set({isLoading: true})
            await AuthApi.logout()
        }
        catch(e){
            console.log(e)
        }
        finally{

            set({isLoading: false})
        }
    },
}))