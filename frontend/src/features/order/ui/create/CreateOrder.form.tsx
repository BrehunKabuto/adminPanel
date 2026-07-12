import { useRef, useState } from "react"
import { Button } from "../../../../shared/ui/Button"
import { Input } from "../../../../shared/ui/Input"
import { useCreateOrderForm } from "../../model/useCreateOrderForm"
import { CreateOrderItem } from "./CreateOrderItem"
import type { CreateOrderItemDto } from "../../api/order.shema"
import { Textarea } from "../../../../shared/ui/Textaria"

export const CreateOrderForm = () => {

    const {form,onSubmit} = useCreateOrderForm()
    const {register, formState: {errors}} = form
    const [items, setItems] = useState<CreateOrderItemDto[]>([]) 

    const submitRef = useRef<HTMLDivElement>(null);
    const addItem = () => {
        
       setItems(prev => [...prev, {
    name: "",
    count: 1,
    price: 0,
  },])

  requestAnimationFrame(() => {
    submitRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
    })
  })
    }

    return (
        <div>
            <h1 className="py-4 text-2xl font-extrabold ">Create New Order</h1>
        <form className="w-full h-full flex flex-col gap-6" onSubmit={onSubmit}>
            
            <div className="space-y-2">
            <p>Enter client Name</p>
            <Input placeholder="clientName" {...register("clientName")}></Input>
            </div>

            <div className="space-y-2">
            <p>Enter client Phone</p>
            <Input type="number"  placeholder="+99 9999999" {...register("clientPhone")}></Input>
            </div>
            <div className="space-y-4" >
            <p>Items</p>
           {items.map((item, index) => (
               <CreateOrderItem key={index} index={index} errors={errors} register={register}/>
            ))}
            <div className="flex justify-center">
            <Button className="w-11/12 h-11 mt-2" type='button' onClick={addItem}>Add item</Button>
            </div>
            </div>

            <div className="space-y-2" >
            <p>Comment</p>
            <Textarea className="w-full h-32 placeholder:text-text-secondary " placeholder="something"/>
            </div>
             <div ref={submitRef} className="flex justify-center mb-2.5">
           <Button type="submit" className="h-11 w-11/12" >Submit</Button>
            </div>
        </form >
        </div>
    )
}