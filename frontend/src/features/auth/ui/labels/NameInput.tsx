import type { InputProps } from "../../../../shared/types/InputProps.type"
import { Input } from "../../../../shared/ui/Input"



export const NameInput = ({
    label = "Enter your name:",
    ...props
}: InputProps) => {

    return (
        <div className="flex flex-col gap-2">
        {label}
        <Input 
        type="text" 
        placeholder="Same name"
        {...props}
        />
        </div>
    )
}