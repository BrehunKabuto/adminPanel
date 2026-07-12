import { Outlet } from "react-router-dom";
import { Navbar } from "../../features/navbar/ui/Navbar";
import { useRole } from "../../features/user/model/useRole";
import { useEffect } from "react";

export function Layout() {

   const {getRole} = useRole()
    useEffect(() => {
        getRole()
    },[])


  return (
    <div >
    
      <aside className="w-64 bg-sidebar left-0 top-0 h-screen fixed">
        <Navbar />
      </aside>

      <main className="flex-1 px-6 ml-64">
        <Outlet />
      </main>
   
    </div>
  );
}