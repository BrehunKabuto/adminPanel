import { apiClient } from "../../../shared/api/apiClient";
import { GetPageOrdersResponse, GetStatsShema, OrderResponseShema, type ChangeOrderStatusDto, type CreateOrderDto, type GetPagesDto } from "./order.shema";


export const OrderApi = {

    create: async(data: CreateOrderDto) => {
        const res = await apiClient.post("order", data)
        return OrderResponseShema.parse(res.data)
    },

    changeStatus: async(data: ChangeOrderStatusDto) => {
        const res = await apiClient.post("order/changeStatus", data)
        return OrderResponseShema.parse(res.data)
    },

    getAll: async() => {
        const res = await apiClient.get("order/all")
        return GetPageOrdersResponse.parse(res.data)
    },

    delete: async(data: number) => {
         await apiClient.delete(`order/${data}`)
        
    },

    getStats: async() => {
        const res = await apiClient.get("order/stats")
        return GetStatsShema.parse(res.data)
    },

    getPages: async(data: GetPagesDto) => {
        const res = await apiClient.get("order/page", {
            params: data
        } )
        return GetPageOrdersResponse.parse(res.data)
    },

    getMyPages: async(data: GetPagesDto) => {
         const res = await apiClient.get("order/myOrderPage", {
            params: data
        } )
        return GetPageOrdersResponse.parse(res.data)
    }



}