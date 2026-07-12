import axios, { AxiosError } from "axios";
import { tokenService } from "../lib/tokenService";
import { useRotateTokenStore } from "../../features/rotateToken/model/RotateToken.store";
import {type InternalAxiosRequestConfig } from "axios";

const ClientOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
}

export const refreshApiClient = axios.create(ClientOptions)

export const publicApiClient = axios.create(ClientOptions)

export const apiClient = axios.create(ClientOptions)

apiClient.interceptors.request.use((config) => {
   
    config.headers.Authorization = getHeader()
    return config
})

let failedResponses: Array<{
    resolve: () => void,
    reject: (error: any) => void
}> = []

function resolveFailedResponses() {
    failedResponses.forEach(({resolve}) => resolve())
    failedResponses = []
}

function rejectFailedResponses(error: any) {
    failedResponses.forEach(({reject}) => reject(error))
    failedResponses = []
}
   
let isRefreshing = false
export const setupInterseption = (navigate: any) => {

    apiClient.interceptors.response.use(
        (response)=> response,
        async (error: AxiosError) => {
            if(error.response?.status === 401){
                try{
                    const { rotate } = useRotateTokenStore.getState()

                    if(!isRefreshing){
                        isRefreshing = true
                        try{
                            const accessToken = await rotate()
                            if (!accessToken) throw new Error("failed rotate token")
                                tokenService.set(accessToken)
                            resolveFailedResponses()

                            error.config!.headers.Authorization = getHeader()
                            return apiClient(error.config!)
                        }
                        catch(e){
                            rejectFailedResponses(e)
                            navigate('/auth/login')
                        }
                    }
                    else{
                         await new Promise<void>((resolve, reject) => {
                            failedResponses.push({resolve, reject})
                        })

                        error.config!.headers.Authorization = getHeader()
                            return apiClient(error.config!)
                    }
                }
                catch{
                    tokenService.remove()
                    navigate("auth/login")
                }
                finally{
                    isRefreshing = false
                }
                return Promise.reject(error)
            }
        }
    )
}
const getHeader = () => {
     const token = tokenService.get()
     return `Bearer ${token}`
}