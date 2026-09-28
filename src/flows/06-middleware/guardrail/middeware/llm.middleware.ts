import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createMiddleware } from "langchain";
import z from "zod";

// Structured output schema
const llmGuardrailSchema = z.object({
  decision: z.enum(["allow", "review", "block"]),
  risk: z.enum(["low", "medium", "high"]),
  reason: z.string(),
});

// LLM
const guardrailModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0,
  maxRetries: 2,
}).withStructuredOutput(llmGuardrailSchema);

// middleware
const llmGuardrailMiddleware = createMiddleware({
  name: "llm-guardrail",

  beforeAgent: async (request) => {
    const lastMessage = request.messages[request.messages.length - 1];

    const result = await guardrailModel.invoke([
      {
        role: "system",
        content: `
          You are a security guardrail for an incident response agent.

          Analyze the user request.

          allow:
          Safe investigation or read-only operation.

          review:
          Potentially dangerous operational actions.

          block:
          Destructive or clearly unsafe operations.
        `,
      },
      {
        role: "user",
        content: String(lastMessage.content),
      },
    ]);

    console.log("🛡️ Guardrail result:", result);

    if (result.decision === "block") {
      throw new Error(`Request blocked: ${result.reason}`);
    }

    if (result.decision === "review") {
      throw new Error(`Human approval required: ${result.reason}`);
    }

    console.log("✅ Request allowed");
  },
});

export default llmGuardrailMiddleware;
