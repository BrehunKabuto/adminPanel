import { apiClient, publicApiClient } from "../../../shared/api/apiClient";
import { AccessTokenShema } from "../../rotateToken/api/accessToken.shema";
import type { LoginFormDto } from "./loginForm.shema";

export const AuthApi = {

    login: async(data: LoginFormDto) => {

        const res =await publicApiClient.post("auth/login", data)
        return AccessTokenShema.parse(res.data)
    },

    logout: async() => {
        await apiClient.post("auth/logout")
    }
}