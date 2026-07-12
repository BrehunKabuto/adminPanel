
export const getRevenueByDataTool = {
    type: "function" as const,
    name: "getRevenueByData",
    description: "Get revenue by date range",
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