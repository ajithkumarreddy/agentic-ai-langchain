/**
 * get_service_health
 */

import { tool } from "langchain";
import z from "zod";

const getServiceHealth = tool(
  ({ service }) => {
    console.log(`Getting health report of service: ${service}`);

    return {
      service,
      status: "healthy",
      latency: 126,
    };
  },
  {
    name: "get_service_health",
    description: "Gets health report of a given api service",
    schema: z.object({
      service: z.string(),
    }),
  },
);

export default getServiceHealth;
