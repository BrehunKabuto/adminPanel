import { NavLink } from "react-router-dom"


export const NavbarItem =  ({
    title,
    icon: Icon,
    to,
    iconClassName,
}: {
    title: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    to: string
    className?: string
    iconClassName?: string
}) => {
    const IconSize = 24
        return (
        
          <NavLink to={to} className={({isActive}) =>
            `flex items-center justify-start px-4 py-2
            hover:bg-accent duration-300 
          ${isActive ? "bg-accent" : ""}`}>
             <Icon width={IconSize} height={IconSize}
              className={`fill-text-primary mx-2.5 ${iconClassName}`} />
            <h1 className="text-text-primary font-bold px-1">{title}</h1>
           
          </NavLink>
       
  )
}