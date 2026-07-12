import { create } from "zustand";
import type { ChangeOrderStatusDto, CreateOrderDto, StatsDto, OrderResponseDto, GetPagesDto, PageOrdersDto } from "../api/order.shema";
import { OrderApi } from "../api/order.api";

interface OrderStore {

    isLoading: boolean,
    create: (data: CreateOrderDto) => Promise<OrderResponseDto | undefined>,
    changeStatus: (data: ChangeOrderStatusDto) => Promise<OrderResponseDto | undefined>,
    delete: (id: number) => Promise<void>,
    getStats: () => Promise<void>,
    getPage: (data: GetPagesDto) => Promise<PageOrdersDto | undefined>,
    getMyPage: (data: GetPagesDto) => Promise<PageOrdersDto | undefined>,
    stats: StatsDto | null
}

export const useOrderStore = create<OrderStore>((set) => ({

    isLoading: false,
    stats: null,
    orders: null,
    create: async(data) => {

        try{
            set({isLoading: true})
            const res = await OrderApi.create(data)
           return res
        }
        catch(e){
            console.log(e)
        }
        finally{
            set({isLoading: false})
        }
    },
    changeStatus: async(data) => {

         try{
            set({isLoading: true})
            const res = await OrderApi.changeStatus(data)
           return res
        }
        catch(e){
            console.log(e)
        }
        finally{
            set({isLoading: false})
        }
    },
     delete: async(data) => {

         try{
            set({isLoading: true})
            await OrderApi.delete(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            set({isLoading: false})
        }
     },
     getStats:async() => {
        try{
            set({isLoading: true})
            const res = await OrderApi.getStats()
            set({stats: res})
        }
        catch(e){
            console.log(e)
        }
        finally{
            set({isLoading: false})
        }
     },

     getPage: async(data) => {
        try{
            set({isLoading: true})
            const res = await OrderApi.getPages(data)
            return res
        }
        catch(e){
            console.error(e)
        }
        finally{
            set({isLoading: false})
        }
     },
      getMyPage: async(data) => {
        try{
            set({isLoading: true})
            const res = await OrderApi.getMyPages(data)
            return res
        }
        catch(e){
            console.error(e)
        }
        finally{
            set({isLoading: false})
        }
     }
}))
