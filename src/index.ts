import "dotenv/config";

import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-5.4",
  temperature: 0,
});

const agent = createAgent({
  model,
  tools: [],
});

console.log(agent);
