import { NavbarItem } from "./navbarItem"
import Main from "../../../assets/Main.svg?react"
import ManagerList from "../../../assets/ManagerList.svg?react"
import AddOrder from "../../../assets/AddOrder.svg?react"
import OrderList from "../../../assets/OrderList.svg?react"
import UserAdd from "../../../assets/UserAdd.svg?react"
import Chat from "../../../assets/Chat.svg?react"
import Dashboard from "../../../assets/Dashboard.svg?react"


import { useRole } from "../../user/model/useRole"
import { UserRoles } from "../../../shared/types/UserRoles.enum"

export const Navbar = () => {
    const {myRole} = useRole()
    return(
        <div className="grid">
            <div className="flex items-center justify-start px-4 mt-6 mb-3 rounded-lg hover:bg-hover-primary  ">
                <Main width={24} height={24}
              className={`fill-text-primary mx-2.5`} />
            <h1 className="text-text-primary font-bold px-1">Admin Panel</h1>
            </div>
            {myRole === UserRoles.ADMIN &&
            <NavbarItem title="Dashboard" className="" icon={Dashboard} to="/dashboard"/>
            }
            <NavbarItem title="Orders" className="" icon={OrderList} to="/order/all"/>
            <NavbarItem title="New Orders" className="" icon={AddOrder} to="/order/create" />
            {myRole === UserRoles.ADMIN &&
            <>
            <NavbarItem title="Manager List" className="" icon={ManagerList} to="user/all"/>
            <NavbarItem title="New Manager" className="" icon={UserAdd} to="user/create"/>
             <NavbarItem title="AI Chat" className="" icon={Chat} to="ai/chat"/>
            </>
            }
        </div>
    )
}