import { apiClient } from "../../../shared/api/apiClient";
import { CreateUserShema, type CreateUserDto, MyRoleShema, ResponseManagersPagesShema, type GetManagerDto } from "./user.shema";
import { GetUserRequestShema } from "./userResponse.shema";

export const UserApi = {

    create: async(data: CreateUserDto) => {
        const res = await apiClient.post("user/create", data)
        return CreateUserShema.parse(res.data)
    },

    delete: async(data: number) => {
        await apiClient.delete(`user/${data}`)
    },

     getById: async(data: number) => {
        const res = await apiClient.post(`user/:${data}`)
        return GetUserRequestShema.parse(res.data)
    },

    getPage: async(data: GetManagerDto) => {
        const res = await apiClient.get("user/page", {params: data})
        return ResponseManagersPagesShema.parse(res.data)
    },

    getMyRole: async() => {
        const res = await apiClient.get("user/myRole")
        return MyRoleShema.parse(res.data)
    },
    getAll: async() => {
        const res = await apiClient.get("user/all")
        return GetUserRequestShema.array().parse(res.data)
    }

    
}