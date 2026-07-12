
export const getAllOrdersTool = {
    type: "function" as const,
    name: "getAllOrders",
    description: "Get all orders from BD",
    strict: true,
    parameters: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  },
}