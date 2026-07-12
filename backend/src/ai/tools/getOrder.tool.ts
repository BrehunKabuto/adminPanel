import { OrderStatus } from "generated/prisma/enums";

export const getOrderTool = {
    type: "function" as const,
    name: "getOrderByStatus",
    description: "Get orders from BD by selected status",
    strict: true,
    parameters: {
        type: "object",
        properties:{
            status: {
                type: "string",
                enum: Object.values(OrderStatus),
                description: "Filter by status"
            }
        },
        required: ['status'],
        additionalProperties: false,
    }
}