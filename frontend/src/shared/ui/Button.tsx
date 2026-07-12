

export const Button = (

    {children, className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>
)  => {

   return(
     <button
    className={ `bg-accent font-bold text-white rounded-lg
          cursor-pointer hover:scale-105
         hover:shadow-lg
                        transition-all 
                        ease-in-out 
                        duration-200
         ${className}`}
    {...props}
    >
        {children}
    </button>
   )
}