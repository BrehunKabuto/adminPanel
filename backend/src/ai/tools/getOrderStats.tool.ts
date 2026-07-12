
export const getOrdersStatsTool = {
    type: "function" as const,
    name: "getOrdersStats",
    description: "Get order statistics: count by status and total revenue",
    strict: true,
    parameters: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  },
}