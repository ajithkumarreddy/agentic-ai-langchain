/**
 * System Message
 * Human Message
 * AI Message
 * Tool Message
 */

import { SystemMessage, HumanMessage, AIMessage, ToolMessage } from "langchain";
import { model } from "../../index.js";

// Conversational history
const messages = [
  new SystemMessage("You are a poetry expert"),
  new HumanMessage("Write a poem on artificial intelligence"),
];

const response = await model.invoke(messages);
console.log(response.content);
