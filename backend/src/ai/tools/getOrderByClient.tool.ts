
export const getOrdersByClientTool = {
    type: "function" as const,
    name: "getOrdersByClient",
    description: "Get order statistics: count by status and total revenue",
    strict: true,
    parameters: {
    type: "object",
    properties: {
      clientName: {
        type: "string",
        description: "name of client"
      }
    },
    required: ["clientName"],
    additionalProperties: false,
  },
}