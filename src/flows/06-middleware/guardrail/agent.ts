import createLLMAgent from "../../../index.js";
import llmGuardrailMiddleware from "./middeware/llm.middleware.js";
import getServiceHealth from "./tools/getServiceHealth.js";
import restartService from "./tools/restartService.js";

// agent
const agent = createLLMAgent([getServiceHealth, restartService], undefined, {
  middleware: [llmGuardrailMiddleware],
});

// agent invoke
const response = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Check service payment-api",
    },
  ],
});

// response
const lastMessage = response.messages[response.messages.length - 1];
console.log(lastMessage.content);
