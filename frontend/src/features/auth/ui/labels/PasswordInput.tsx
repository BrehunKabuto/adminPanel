import type { InputProps } from "../../../../shared/types/InputProps.type"
import { Input } from "../../../../shared/ui/Input"

export const PasswordInput = ({
    label = "Enter your password:",
    ...props
}: InputProps) => {

    return (
        <div className="flex flex-col gap-2 border-border">
        {label}
        <Input
        type="password" 
        placeholder="Example: password123X"
        {...props}
        />
        </div>
    )
}