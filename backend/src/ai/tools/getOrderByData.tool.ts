
export const getOrdersByDataTool = {
    type: "function" as const,
    name: "getOrdersByData",
    description: `Get orders by date range. Today's date is`,
    strict: true,
    parameters: {
    type: "object",
    properties: {
       from: {
        type: "string",
        description: "Start date in ISO format (e.g. 2026-06-27)",
      },
      to: {
        type: "string",
        description: "End date in ISO format (e.g. 2026-06-27)",
      },
    },
    required: ["from", "to"],
    additionalProperties: false,
  },
}