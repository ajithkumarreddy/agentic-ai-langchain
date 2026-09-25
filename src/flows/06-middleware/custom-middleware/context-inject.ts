import { createMiddleware, tool, SystemMessage } from "langchain";
import z from "zod";
import createLLMAgent from "../../../index.js";

const incidentContext = {
  incidentId: "INC-101",
  service: "payment-api",
  environment: "production",
  severity: "critical",
};

const getServiceHealth = tool(
  ({ service }) => {
    console.log("\n🔧 Tool executing");
    console.log("Service:", service);

    const result = {
      service,
      status: "healthy",
      latency: 120,
    };

    console.log("Tool result:", result);

    return result;
  },
  {
    name: "get_service_health",
    description: "Gets the health report of an API service",
    schema: z.object({
      service: z.string(),
    }),
  },
);

const incidentContextMiddleware = createMiddleware({
  name: "incident_context_middleware",

  wrapModelCall: async (request, handler) => {
    console.log("\n🟡 wrapModelCall → Before Model");

    const contextMessage = new SystemMessage(
      `
      You are investigating an incident.

      Incident ID: ${incidentContext.incidentId}
      Service: ${incidentContext.service}
      Environment: ${incidentContext.environment}
      Severity: ${incidentContext.severity}
      `.trim(),
    );

    const updatedRequest = {
      ...request,
      messages: [contextMessage, ...request.messages],
    };

    const response = await handler(updatedRequest);

    console.log("🟢 wrapModelCall → After Model");

    return response;
  },

  wrapToolCall: async (request, handler) => {
    console.log("\n🔵 wrapToolCall → Before Tool");
    console.log("Tool:", request.toolCall.name);
    console.log("Arguments:", request.toolCall.args);

    const response = await handler(request);

    console.log("🟣 wrapToolCall → After Tool");
    console.log("Result:", response);

    return response;
  },
});

const agent = createLLMAgent([getServiceHealth], undefined, {
  middleware: [incidentContextMiddleware],
});

console.log("\n🚀 User Request");

const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: 'Check the health of "payment-api" service',
    },
  ],
});

const lastMessage = response.messages[response.messages.length - 1];

console.log("\n🏁 Final Response");
console.log(lastMessage.content);
