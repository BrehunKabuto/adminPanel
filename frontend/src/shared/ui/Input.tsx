import type React from "react";

export const Input = (

    {children, className, ...props}: React.InputHTMLAttributes<HTMLInputElement>
) => {

    return (
        <input
        className={`
            border-2 outline-none
             focus:ring-accent/30 focus:ring-2
                focus:border-accent
                transition-all
                duration-150
              border-border
              text-text-primary placeholder:text-text-secondary
            ${className}`}
        {...props}
        >
        {children}
        </input>
    )
}