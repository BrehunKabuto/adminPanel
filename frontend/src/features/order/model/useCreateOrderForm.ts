import { useForm } from "react-hook-form"
import { useCreateOrder } from "./useCreateOrder"
import { CreateOrderShema, type CreateOrderDto } from "../api/order.shema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

export const useCreateOrderForm = () => {

    const {create} = useCreateOrder()
    const navigate = useNavigate()

    const form = useForm<CreateOrderDto>({
        resolver: zodResolver(CreateOrderShema)
    })

    const onSubmit = form.handleSubmit(async(data) => {

        await create(data)
        navigate("/order/all")
    })

    return {form, onSubmit}
}