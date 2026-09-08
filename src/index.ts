import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

import { createAgent, tool } from "langchain";
import * as z from "zod";

const getWeather = tool((input) => `It's always sunny in ${input.city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
});

const agent = createAgent({
  model,
  tools: [getWeather],
});

const response = await agent.invoke({
  messages: [{ role: "user", content: "What's the weather in San Francisco?" }],
});

const aiMessage = response.messages.find(
  (message) => message.getType() === "ai",
);

for (const [index, message] of response.messages.entries()) {
  console.log(`\n--- Message ${index} ---`);
  console.log("Type:", message.getType());
  console.log("Content:", message.content);
  console.log("Tool calls:", message?.tool_calls);
}
