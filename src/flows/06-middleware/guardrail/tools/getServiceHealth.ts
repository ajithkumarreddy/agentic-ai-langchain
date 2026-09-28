import { tool } from "langchain";
import z from "zod";

const getServiceHealth = tool(
  ({ service }) => {
    console.log("Getting health report of service: ", service);

    return {
      service,
      status: "healthy",
    };
  },
  {
    name: "get_service_health",
    description: "Gets service health report",
    schema: z.object({
      service: z.string(),
    }),
  },
);

export default getServiceHealth;
