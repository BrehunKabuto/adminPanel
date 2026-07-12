import type React from "react"
import { Button } from "../../../shared/ui/Button"
export function UserForm(
    {
    children,
    onSubmit,
    buttonTitle,
    className
    }:{
    className: string,
    children: React.ReactNode,
    onSubmit: () => void,
    buttonTitle: string
    }
) {

    return (
        
        <div className={`overscroll-none flex items-center justify-center ${className}`}>

            <form onSubmit={onSubmit}
            className="flex flex-col gap-4 md:w-1/3
         p-6 border
            border-border rounded-lg
             bg-surface
            align-items-center justify-between
            h-auto">
                {children}
              <Button type="submit" className="w-full py-1.5">
            {buttonTitle}
        </Button>
            </form>
        </div>
    )
}