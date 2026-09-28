/**
 * get_service_health
 */

import { tool } from "langchain";
import z from "zod";

let attempts = 0;

const getServiceHealth = tool(
  ({ service }) => {
    attempts++;

    console.log("Checking:", service);

    if (attempts < 3) {
      throw new Error("Health API temporarily unavailable");
    }

    return {
      service,
      status: "healthy",
    };
  },
  {
    name: "get_service_health",
    description: "Gets health report of given api service",
    schema: z.object({
      service: z.string(),
    }),
  },
);

export default getServiceHealth;
