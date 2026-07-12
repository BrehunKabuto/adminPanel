import { useEffect, useRef, useState } from "react";
import type { UserDto } from "../../api/user.shema";
import { useManagerList } from "../../model/useManagerList";
import { mergeById } from "../../../../shared/utils/margeById";
import { ManagerCard } from "./ManagerCard";

export const ManagerList = () => {
    

    const [hasMore, setHasMore] = useState(false)
    const {getPage,isLoading, deleteManager} = useManagerList()
    const [allManagers, setAllManagers] = useState<UserDto[]>([])
    const [page,setPage] = useState(1)

     const loadMoreRef = useRef<HTMLTableRowElement>(null);

     const load = async() => { 
                const res = await getPage({page, limit: 10})
                if(res){
                  setAllManagers(prev =>mergeById(prev, res.managers))
                  setHasMore(res.hasMore)
                }
          }
     const removeManager = async(id: number) => {
        await deleteManager({id})
  setAllManagers(prev => prev.filter(o => o.id !== id));
};

     useEffect(() => {
             const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    setPage(page + 1)
                }
            },
            {
                threshold: 1,
            }
        );
    
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }
    
        return () => observer.disconnect();
        }, [isLoading, hasMore, page])
    useEffect(() => {load()}, [page])   
      useEffect(() => {load()}, [])       
    return (
       <div className="w-full h-full">
             <h1 className="py-4 text-2xl font-extrabold ">Manager List</h1>
            <table className=" w-full border-separate table-fixed border-spacing-y-2">
                <thead>
                    <tr className="text-text-secondary">
                    <th className="text-center py-2">ID</th>
                    <th className="text-center py-2">Name</th>
                    <th className="text-center py-2">Orders</th>
                    <th className="text-center py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allManagers.map(manager => (
                            <ManagerCard data={manager} key={manager.id} removeManager={removeManager}/>
                        ))
                    }
                </tbody>
            </table>
       </div>
    )
}