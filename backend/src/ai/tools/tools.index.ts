import { Tool } from "openai/resources/responses/responses.js"
import { getOrderTool } from "./getOrder.tool"
import { getAllOrdersTool } from "./getAllOrder.tool"
import { getOrdersStatsTool } from "./getOrderStats.tool"
import { getOrdersByClientTool } from "./getOrderByClient.tool"
import { getOrdersByDataTool } from "./getOrderByData.tool"
import { getRevenueByDataTool } from "./getRevenueByData.tool"


export const tools: Tool[] =[
    getOrderTool,
    getAllOrdersTool,
    getOrdersStatsTool,
    getOrdersByClientTool,
    getOrdersByDataTool,
    getRevenueByDataTool
]