import { createLLMAgent } from "../index.js";
import getWeather from "../tools/weather.tool.js";

const agent = createLLMAgent([getWeather]);

const response = await agent.invoke({
  messages: [{ role: "user", content: "What's the weather in San Francisco?" }],
});

for (const [index, message] of response.messages.entries()) {
  console.log(`\n--- Message ${index} ---`);
  console.log("Type:", message.getType());
  console.log("Content:", message.content);

  if (message.getType() === "ai") {
    console.log("Tool calls:", message.tool_calls);
  }
}
