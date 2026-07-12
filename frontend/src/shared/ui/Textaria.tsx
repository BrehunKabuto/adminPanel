import type React from "react";

export const Textarea = (

    { className, ...props}: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => {

    return (
        <textarea
        className={`
            border-2 outline-none
             focus:ring-accent/30 focus:ring-2
                focus:border-accent
                transition-all
                duration-150
              border-border
              text-text-primary 
            ${className}`}
        {...props}
        />
    )
}