import type { InputProps } from "../../../../shared/types/InputProps.type"
import { Input } from "../../../../shared/ui/Input"




export const EmailInput = ({
    label = "Enter your email:",
    ...props
}: InputProps) => {

    return (
        <div className="flex flex-col gap-2">
        {label}
        <Input
        type="email" 
        placeholder="example@example.com"
        {...props}
        />
    </div>
    )
}