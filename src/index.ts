import "dotenv/config";

import { createAgent, CreateAgentParams, ResponseFormat } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredTool } from "@langchain/core/tools";

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
});

type AgentOptions = Omit<
  CreateAgentParams,
  "model" | "tools" | "responseFormat"
>;

const createLLMAgent = (
  tools: StructuredTool[] = [],
  responseFormat?: ResponseFormat | any,
  options: AgentOptions = {},
) => {
  return createAgent({
    model,
    tools,
    responseFormat,
    ...options,
  });
};

export default createLLMAgent;
