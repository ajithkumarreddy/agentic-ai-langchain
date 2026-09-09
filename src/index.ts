import "dotenv/config";

import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredTool } from "@langchain/core/tools";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
});

const createLLMAgent = (tools: StructuredTool[] = []) => {
  return createAgent({
    model,
    tools,
  });
};

export default createLLMAgent;
