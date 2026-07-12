import { GetOrdersDto } from "../dto/getOrders.dto";

export function BuildOrderWhere(data: GetOrdersDto){

    return {
        ...(data.managerId && {managerId: data.managerId})
    }
}