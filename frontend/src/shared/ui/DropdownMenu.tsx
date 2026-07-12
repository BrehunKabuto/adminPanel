import { useEffect, useRef, useState } from "react"
import type { DropdownMenuElements } from "../types/DropdownMenuElements.type"
import Edit from "../../assets/Edit.svg?react"


    export const DropdownMenu = (

        {elements}:{elements: DropdownMenuElements}
    ) => {
        const IsClikable = elements.length > 0
        const [IsOpen, setIsOpen] = useState(false)
        const ref = useRef<HTMLDivElement>(null)

        useEffect(() => {
             if (!IsOpen) return;
            const handleClick = (e: MouseEvent) => {
                if(ref.current && !ref.current.contains(e.target as Node)){
                    setIsOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClick)
            return () => document.removeEventListener('mousedown', handleClick);
        }, [IsOpen])
        return(
            <div ref={ref} className="relative inline-block">
                <button 
                className={`
                    ${
                    IsClikable && "cursor-pointer"
                    }
                `}
                onClick={() => setIsOpen(!IsOpen)}>
                    <Edit className={` 
                        ${
                    IsClikable ? "fill-text-primary" : "fill-text-secondary"
                    }
                        `} width={16} height={16}/>
                </button>
            {(IsOpen && IsClikable ) && (
                <div className="absolute right-0 mt-2 w-48 bg-surface/50 shadow-lg">
                {
                    elements.map(item => {
                        return(

                            <button
                            key={item.title}
                                onClick={async() => {
                                await item.onClick()
                                setIsOpen(false)
                                }}
                                className="block w-full px-4 py-2 text-left hover:bg-accent/45 transition-all duration-300"
                            >
                            {item.title} 
                        </button>
                        )
                    })
                }
                </div>
                
            )}
            </div>
        )
    }