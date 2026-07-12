import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterseption } from "./shared/api/apiClient";
import { Route, Routes } from 'react-router-dom'
import LoginFormPage from "./pages/LoginForm.page";
import DashbordPage from "./pages/Dashbord.page";
import { Layout } from "./shared/ui/Layout";
import OrderList from "./pages/OrderList.page";
import CreateOrderPage from "./pages/CreateOrder.page";
import CreateUserPage from "./pages/CreateUser.page";
import ChatPage from "./pages/Chat.page";
import ManagerListPage from "./pages/ManagerList.page";

export default function App() {

    const navigate = useNavigate()
   
    
    useEffect(() => {
      setupInterseption(navigate)
    }, [])

    return (
       
      <Routes>
        <Route path="auth/login" element={<LoginFormPage/>}/>
        <Route  element={<Layout/>}>
          <Route path="dashboard" element={<DashbordPage/>} />
          <Route path="order/all" element={<OrderList/>}/>
          <Route path="order/create" element={<CreateOrderPage/>}/>
          <Route path="user/create" element={<CreateUserPage/>}/>
          <Route path="ai/chat" element={<ChatPage/>}/>
          <Route path="user/all" element={<ManagerListPage/>}/>
        </Route>
      </Routes>
   
    )
    
}