import "dotenv/config";

import { createAgent, ResponseFormat } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredTool } from "@langchain/core/tools";

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
});

const createLLMAgent = (
  tools: StructuredTool[] = [],
  responseFormat?: ResponseFormat | any,
) => {
  return createAgent({
    model,
    tools,
    responseFormat,
  });
};

export default createLLMAgent;
