/**
 * Here we are covering bind_tools with custom tool_execution_loop
 */

import { AIMessage, HumanMessage, ToolMessage } from "langchain";
import { model } from "../index.js";
import getWeather from "../tools/weather.tool.js";

const modelWithTools = model.bindTools([getWeather]);
const messages: [AIMessage | HumanMessage | ToolMessage] = [
  new HumanMessage("Whats the weather in New York?"),
];

// Invoke LLM
const aiResponse = await modelWithTools.invoke(messages);
messages.push(aiResponse);

if (AIMessage.isInstance(aiResponse) && aiResponse.tool_calls?.length) {
  const toolCall = aiResponse.tool_calls[0];

  const toolResult = await getWeather.invoke(
    toolCall.args as Parameters<typeof getWeather.invoke>[0],
  );

  messages.push(
    new ToolMessage({
      content: String(toolResult),
      tool_call_id: toolCall.id!,
    }),
  );
}

const finalResponse = await modelWithTools.invoke(messages);
console.log(finalResponse.content);
