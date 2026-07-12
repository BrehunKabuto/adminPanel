import { useForm } from "react-hook-form"
import { CreateUserShema, type CreateUserDto } from "../api/user.shema"
import { useUserStore } from "./user.store"
import { zodResolver } from "@hookform/resolvers/zod"

export const useCreateUserForm = () => {

    const create = useUserStore((s) => s.create)

    const form = useForm<CreateUserDto>({
        resolver: zodResolver(CreateUserShema)
    })

    const onSubmit = form.handleSubmit(async(data) => {

        await create(data)
    })

    return {form, onSubmit}
}