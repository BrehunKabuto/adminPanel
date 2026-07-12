import { useEffect, useRef, useState } from "react"
import { Input } from "../../../shared/ui/Input"
import { Button } from "../../../shared/ui/Button"
import type { AiResponseMessageDto } from "../api/ai.shema"
import { mergeById } from "../../../shared/utils/margeById"
import { UseAi } from "../model/useAi"
import { Message } from "./Message"
import { MessageRoles } from "../../../shared/types/MessageRoles.type"
import Send from "../../../assets/Send.svg?react"

export const Chat = () => {

    const [sendMessage, setSendMessage] = useState("")
    const [hasMore, setHasMore] = useState(false)
    const [messages, setMessages] = useState<AiResponseMessageDto[]>([])
    const [page, setPage] = useState(1)
    const {chat, getPages, isLoading} = UseAi()

    const loadMoreRef = useRef<HTMLDivElement>(null);

     const load = async() => { 
                const res = await getPages(page, 10)
                if(res){
                  setMessages(prev =>mergeById(prev, res.messages))
                  setHasMore(res.hasMore)
                }
          }
        const frontMessage = (message: string): AiResponseMessageDto => {

            return {
                id: Date.now(),
                content: message,
                role: MessageRoles.USER
            }
        }
    const send = async() => {
        if(!sendMessage.trim()) return
        const content = sendMessage
        setSendMessage("")
         setMessages(prev =>[...prev, frontMessage(content)])
        const res = await chat({message:content})
        if(!res) return
        setMessages(prev =>[...prev,res])
    }

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

    useEffect(()=> {load()}, [])
    useEffect(() => {load()}, [page])
    return(
        <div className="w-full h-full flex flex-col">
         <h1 className="py-4 text-2xl font-extrabold ">AI Chat</h1>
        <div 
        className="flex flex-col w-full pb-20"
        >
            <div ref={loadMoreRef}/>
        {
            messages.map(m => <Message message={m} key={m.id}/>)
        }

        </div>
            <div className="fixed bottom-0 left-64 flex justify-center right-0 bg-surface p-4">
                <Input placeholder=" Write a messages"  
                className="h-9 w-11/12 mr-3.5"
                value={sendMessage} 
                onChange={(e) => setSendMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                ></Input> 
 
                <Button onClick={() => send()}>{<Send width={36} height={36} className="fill-text-primary p-2" />}</Button>
            </div>
        </div> 
    )
}