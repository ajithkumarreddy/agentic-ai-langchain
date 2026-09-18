/*
Refer for example

import createLLMAgent from "../index.js";
import getWeather from "../tools/weather.tool.js";

const agent = createLLMAgent([getWeather]);

const responses = await agent.batch([
  {
    messages: [
      {
        role: "user",
        content: "What's the weather in Bangalore?",
      },
    ],
  },
  {
    messages: [
      {
        role: "user",
        content: "What's the weather in San Francisco?",
      },
    ],
  },
  {
    messages: [
      {
        role: "user",
        content: "What's the weather in London?",
      },
    ],
  },
]);

responses.forEach((state, i) => {
  const lastMessage = state.messages[state.messages.length - 1];
  console.log(`Response ${i + 1}:`, lastMessage.content);
});
*/