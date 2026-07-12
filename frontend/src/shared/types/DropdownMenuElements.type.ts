import type { OrderResponseDto } from "../../features/order/api/order.shema"

export type DropdownMenuElements = DropdownMenuElement[]

type DropdownMenuElement = {

    title: string,
    onClick:() => Promise<void | OrderResponseDto>
}