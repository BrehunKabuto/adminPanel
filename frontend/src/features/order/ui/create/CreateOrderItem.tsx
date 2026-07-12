import type { UseFormRegister } from "react-hook-form"
import { Input } from "../../../../shared/ui/Input"

export const CreateOrderItem = (

    {register,
    index,
    errors
     }:{
    register: UseFormRegister<any>,
    index: number,
    errors: any

    }
) => {

    return (
        <div >
        
        <div className="grid-cols-3 justify-center items-center space-x-4 w-full">
        <Input {...register(`items.${index}.name`)} placeholder="item name" type="text"></Input>
        <Input {...register(`items.${index}.count`, {valueAsNumber: true})} placeholder="item count" type="number"></Input>
        <Input {...register(`items.${index}.price`, {valueAsNumber: true})} placeholder="item price" type="number"  step="0.01"></Input>
        {errors.items?.[index] && <span>{errors.items[index].message}</span>}
        </div>
        </div>
    )
}