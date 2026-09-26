import { createMiddleware } from "langchain";
import z from "zod";

const toolFilterMiddleware = createMiddleware({
  name: "tool-filter",
  contextSchema: z.object({
    environment: z.enum(["production", "staging"]),
    severity: z.enum(["low", "high", "critical"]),
  }),
  wrapModelCall: async (request, handler) => {
    console.log("Filtering tools based on request");
    const { context } = request.runtime;

    const filteredTools =
      context.environment === "production" && context.severity === "critical"
        ? request.tools.filter((tool) => tool.name !== "restart_service")
        : request.tools;

    const modifiedRequest = {
      ...request,
      tools: filteredTools,
    };

    return handler(modifiedRequest);
  },
});

export default toolFilterMiddleware;
