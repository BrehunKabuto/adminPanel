import { EmailInput } from "../../auth/ui/labels/EmailInput"
import { NameInput } from "../../auth/ui/labels/NameInput"
import { PasswordInput } from "../../auth/ui/labels/PasswordInput"
import { UserForm } from "../../auth/ui/User.form"
import { useCreateUserForm } from "../model/useCreateUser.form"

export const CreateUserForm = () => {

    const {form, onSubmit} = useCreateUserForm()
    const {register, formState: {errors}} = form

    return (
        <div className="w-full h-screen">
             <h1 className="py-4 text-2xl font-extrabold ">Create Manager</h1>
            <UserForm onSubmit={onSubmit} buttonTitle="Create" className="h-10/12">
                <NameInput label="New manager name" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}

                <EmailInput label="New manager email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}

                <PasswordInput label="New manager password" {...register("password")} />
                {errors.password && <span>{errors.password?.message}</span>}
            </UserForm>

        </div>
    )
}