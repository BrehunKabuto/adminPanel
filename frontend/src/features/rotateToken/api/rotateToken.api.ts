import { refreshApiClient } from "../../../shared/api/apiClient"
import { AccessTokenShema } from "./accessToken.shema"


export const RotateTokenApi = {

    refresh: async () => {

        
        const res = await refreshApiClient.post("auth/refresh")
        return AccessTokenShema.parse(res.data)
    }
} 