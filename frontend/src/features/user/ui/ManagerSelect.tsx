import React, { useEffect, useState } from "react";
import type { GetUserRequestDto } from "../api/userResponse.shema";
import { useManagerList } from "../model/useManagerList";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

export const ManagerSelect = (
  {selected,setSelected}: {
     selected: GetUserRequestDto | null;
  setSelected: React.Dispatch<React.SetStateAction<GetUserRequestDto | null>>
  }
) => {

    const {getAll} = useManagerList()
    const [managers, setManagers] = useState<GetUserRequestDto[] | null>([])
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? managers
      : managers?.filter((m) =>
          m.name.toLowerCase().includes(query.toLowerCase())
        )
    
    const load = async() => {
        const res = await  getAll()
        if (!res) return 
        setManagers(res)
       
    }
    useEffect(() =>  {load()}, [])

    return (
        <Combobox value={selected} onChange={setSelected}>
             <div className="relative w-64">
                 <ComboboxInput
          className="w-full border-text-secondary 
          focus:outline-none
          focus:ring-accent/30 focus:ring-2
                focus:border-accent
                transition-all
               rounded
           duration-150 border p-2"
           displayValue={(manager: GetUserRequestDto | null) =>
    manager ? manager.name : "All managers"
  }
          onChange={(e) => setQuery(e.target.value)}
        />
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-y-auto rounded  bg-surface/60 shadow">
          <ComboboxOption value={null}
          className="cursor-pointer p-2 hover:bg-accent">
  All managers
</ComboboxOption>
          {filtered && filtered.map((manager) => (
            <ComboboxOption
              key={manager.id} 
              value={manager}
              className="cursor-pointer p-2 hover:bg-accent"
            >
              {manager.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
             </div>
        </Combobox>
    )
}