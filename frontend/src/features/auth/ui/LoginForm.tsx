import { UseLoginForm } from "../model/useLoginForm"
import { EmailInput } from "./labels/EmailInput"
import { PasswordInput } from "./labels/PasswordInput"
import { UserForm } from "./User.form"

export function LoginForm() {

    const {form,onSubmit} = UseLoginForm()
    const {register, formState: {errors}} = form

    return (
        
        <UserForm onSubmit={onSubmit} buttonTitle="Login" className="h-dvh md:h-screen">
             {EmailInput({...register("email")})}
              {errors.email && <span>{errors.email.message}</span>}

              {PasswordInput({...register("password")})}
         {errors.password && <span>{errors.password.message}</span>}
        </UserForm>

      
    )
}