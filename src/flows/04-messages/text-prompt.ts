/**
 * Text prompt are strings - ideal for straightforward generation tasks where you don't need to retain conversation history
 */

import { model } from "../../index.js";

const response = await model.invoke("What are AI Agents?");

console.log(response.content);
