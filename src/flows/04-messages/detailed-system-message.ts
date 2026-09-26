import { HumanMessage, SystemMessage } from "langchain";
import createLLMAgent from "../../index.js";

const agent = createLLMAgent([]);

const systemMessage =
  new SystemMessage(`You are a senior Node.js/Express developer with expertise in web frameworks.
Always provide code examples and explain your reasoning.
Be concise and thorough in your explanation.`);

const messages = [
  systemMessage,
  new HumanMessage("How do I create a REST API?"),
];

const response = await agent.invoke({ messages });

const lastMessage = response.messages[response.messages.length - 1];
console.log(lastMessage.content);
