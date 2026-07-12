import { useNavigate } from "react-router-dom"
import { useAuthStore } from "./Auth.store"
import {useForm} from "react-hook-form"
import { LoginFormShema, type LoginFormDto } from "../api/loginForm.shema"
import { zodResolver } from "@hookform/resolvers/zod"
import { tokenService } from "../../../shared/lib/tokenService"
import { useRole } from "../../user/model/useRole"
import { UserRoles } from "../../../shared/types/UserRoles.enum"

export const UseLoginForm = () => {

    const {getRole,myRole} = useRole()
    const login = useAuthStore((s) => s.login)
    const navagate = useNavigate()

    const form = useForm<LoginFormDto>({
        resolver: zodResolver(LoginFormShema)
    })

    const onSubmit = form.handleSubmit(async(data) => {
        const token = await login(data)
        if(token) {
            tokenService.set(token.accessToken)
            await getRole()

            if (myRole === UserRoles.ADMIN){
                navagate("/dashboard")
            }
            else {
                navagate("/order/all")
            }
        }
    })

    return {form, onSubmit}


}