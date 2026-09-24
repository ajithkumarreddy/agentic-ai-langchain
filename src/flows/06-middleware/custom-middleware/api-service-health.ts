import { createMiddleware, tool } from "langchain";
import createLLMAgent from "../../../index.js";
import z from "zod";

// tools
const getServiceHealth = tool(
  ({ service }) => {
    console.log("Getting health reports for service: ", service);

    return {
      service,
      status: "healthy",
      latency: 120,
    };
  },
  {
    name: "get_service_health",
    description: "gets health report of api service",
    schema: z.object({
      service: z.string(),
    }),
  },
);

// responseFormat
const serviceHealthReportSchema = z.object({
  service: z.string(),
  status: z.string(),
  latency: z.number(),
});

// middleware
const loggingMiddleware = createMiddleware({
  name: "logging_middleware",
  beforeModel: async (state) => {
    console.log("Before Model Execution");
    console.log("Message count:", state.messages.length);
  },
  afterModel: async (state) => {
    console.log("After Model Execution");
    console.log("Message count:", state.messages.length);
  },
});

// agent
const agent = createLLMAgent([getServiceHealth], serviceHealthReportSchema, {
  middleware: [loggingMiddleware],
});

// invoke agent
const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: 'Fetch health report of api service "payment-k8s"',
    },
  ],
});

const lastMessage = response.messages[response.messages.length - 1];
console.log(lastMessage.content);
