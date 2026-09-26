import createLLMAgent from "../../../index.js";
import toolFilterMiddleware from "./middleware/toolFilter.middleware.js";
import getServiceHealth from "./tools/getServiceHealth.js";
import restartService from "./tools/restartService.js";

// agent
const agent = createLLMAgent([getServiceHealth, restartService], undefined, {
  middleware: [toolFilterMiddleware],
});

// invoke agent
const response = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: 'Check service health of api "payment-api"',
      },
    ],
  },
  {
    context: {
      environment: "production",
      severity: "critical",
    },
  },
);

// response
const lastMessage = response.messages[response.messages.length - 1];
console.log(lastMessage.content);
