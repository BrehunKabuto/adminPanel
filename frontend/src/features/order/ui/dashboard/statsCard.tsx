
export const StatsCard = ({title, value}: {title: string, value: number}) => {

    return(
        <div className="bg-surface p-4 rounded-lg ">
            <h3 className="text-text-primary font-semibold">{title}</h3>
            <p className="text-text-secondary">{value}</p>
        </div>
    )
} 