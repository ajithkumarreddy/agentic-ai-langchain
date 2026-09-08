import "dotenv/config";

import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
});

export const createLLMAgent = (tools: any[] = []) => {
  return createAgent({
    model,
    tools,
  });
};

export default createLLMAgent;
