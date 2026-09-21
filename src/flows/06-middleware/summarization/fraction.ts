import { HumanMessage, AIMessage, summarizationMiddleware } from "langchain";
import createLLMAgent, { model } from "../../../index.js";

const agent = createLLMAgent([], undefined, {
  middleware: [
    summarizationMiddleware({
      model,
      trigger: {
        fraction: 0.002,
      },
      keep: {
        fraction: 0.0001,
      },
    }),
  ],
});

const longHistory = [
  new HumanMessage("Hi! My name is Alice and I am a backend developer."),
  new AIMessage("Hello Alice! How can I assist you today?"),
  new HumanMessage("I live in Seattle and prefer Node.js."),
  new AIMessage("Seattle is great! Node.js is a solid runtime choice."),
  new HumanMessage("My favorite database is PostgreSQL."),
  new AIMessage("PostgreSQL pairs very well with Node.js."),
  new HumanMessage("I am learning LangChain and TypeScript right now."),
  new AIMessage(
    "LangChain with TypeScript offers strong typing and tool support.",
  ),
  new HumanMessage("Can you remind me what my favorite database is?"),
  new AIMessage("Your favorite database is PostgreSQL!"),
  new HumanMessage("Awesome! What else do you know about me?"),
];

const response = await agent.invoke({ messages: longHistory });

for (const [index, message] of response.messages.entries()) {
  console.log(`\n[Message ${index}] Type: ${message.getType()}`);
  console.log(`Content: ${message.content}`);
}
