import { useAiStore } from "./Ai.store"

export const UseAi = () => {

    const chat = useAiStore((s) => s.chat)
    const getPages = useAiStore((s) => s.getPages)
    const isLoading = useAiStore((s) => s.isLoading)
    return {chat, getPages, isLoading}
}