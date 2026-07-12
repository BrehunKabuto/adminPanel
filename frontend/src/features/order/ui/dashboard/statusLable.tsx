
export const StatusLabel = ({status}: {status: string}) => {
    const color = StatusColor[status as keyof typeof StatusColor]
    return(
        <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
        <div className="flex items-center justify-center">
             <div className={`h-2 w-2 mt-1.5 rounded-full ${color.bg}`} />
            <p className= {`px-2 ${color.text} `}>       
                {status.toLowerCase().replace("_", " ")}
                </p>
        </div>
        </td>
    
    )

}

const StatusColor = {
    NEW:{
        bg: "bg-new",
        text: "text-new"
    },
    IN_PROGRESS: {
        bg: "bg-in-progress",
        text: "text-in-progress"
    },
    COMPLETED: {
        bg: "bg-completed",
        text: "text-completed"
    },
    CANCELED: {
        bg: "bg-cancelled",
        text: "text-cancelled"
    }
} 