/**
 * restart_service
 */

import { tool } from "langchain";
import z from "zod";

const restartService = tool(
  ({ service }) => {
    console.log(`Restarting service: ${service}`);

    return {
      service,
      status: "restarted",
    };
  },
  {
    name: "restart_service",
    description: "Restarts a given api service",
    schema: z.object({
      service: z.string(),
    }),
  },
);

export default restartService;
