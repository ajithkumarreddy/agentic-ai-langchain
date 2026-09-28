import createLLMAgent from "../../../index.js";
import errorHandlingMiddleware from "./middleware/errorhandling.middleware.js";
import getServiceHealth from "./tools/getServiceHealth.js";

// agent
const agent = createLLMAgent([getServiceHealth], undefined, {
  middleware: [errorHandlingMiddleware],
});

// invoke agent
const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Check service report of 'payment-api' service",
    },
  ],
});

const lastMessage = response.messages[response.messages.length - 1];
console.log(lastMessage.content);
