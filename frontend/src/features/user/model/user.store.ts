import { create } from "zustand";
import type { CreateUserDto, GetManagerDto, GetUserDto, ResponseManagerPagesDto } from "../api/user.shema";
import { UserApi } from "../api/user.api";
import type { GetUserRequestDto } from "../api/userResponse.shema";


interface UserStore {

    isLoading: boolean,
    myRole: string | null,
    create: (data: CreateUserDto) => Promise<void>,
    getPage: (data: GetManagerDto) => Promise<ResponseManagerPagesDto | undefined>,
    getAll: () => Promise<GetUserRequestDto[] | undefined>
    delete: (data:GetUserDto) => Promise<void>,
    getRole: () => Promise<void>
}

export const useUserStore = create<UserStore>((set)=> ({

    isLoading: false,
    myRole: null,
    create: async(data) => {

        try{
            set({isLoading: true})
            await UserApi.create(data)
        }
        catch(e){


        }
        finally{
            set({isLoading: false})
        }
    },
    getPage: async(data) => {

        try{
            set({isLoading: true})
             const res = await UserApi.getPage(data)
            return res
        }
        catch(e){
            console.log(e)
        }
        finally{

            set({isLoading: false})
           
        }
    },

    getAll: async() => {
        try{
            set({isLoading: true})
            const res = await UserApi.getAll()
            return res
        }
        catch(e){
            console.error(e)
        }
        finally{
            set({isLoading: false})
        }
    },
    delete: async(data) => {

        try{
            set({isLoading: true})
            await UserApi.delete(data.id)
        }
        catch(e){
            console.log(e)
        }
        finally{
            set({isLoading: false})
            
        }
    },

    getRole: async() => {
        try{
            set({isLoading: true})
            const res = await UserApi.getMyRole()
            set({myRole: res.role})
        }
        catch(e){
            console.log(e)
        }
        finally{
            set({isLoading: false})
        }
    }
}))