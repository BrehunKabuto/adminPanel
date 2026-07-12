import type { UserDto } from "../../api/user.shema"
import List from "../../../../assets/list.svg?react"
import Trash from "../../../../assets/Trash.svg?react"
import { useNavigate } from "react-router-dom"

export const ManagerCard = (
    {data,removeManager} : {
        data: UserDto, 
        removeManager: (id: number) => void
    }
) => {

    const navigate = useNavigate()

    return (
        <tr>
              <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
                <p>{data.id}</p>
            </td>
            <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
            <p>{data.name}</p>
            </td>
            <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
            <button className="px-2 cursor-pointer"
            onClick={() => navigate("/order/all",
                {
                    state: data
                }
            )
            }
            >{<List width={24} height={24} className="fill-text-primary"/>}</button>
            </td>
            <td className="text-center py-4 px-4 bg-surface first:rounded-l-lg last:rounded-r-lg">
            <button onClick={() => removeManager(data.id)} className="px-2 cursor-pointer">{<Trash width={24} height={24} className="fill-text-primary"/>}</button>
            </td>
        </tr>
    )
}