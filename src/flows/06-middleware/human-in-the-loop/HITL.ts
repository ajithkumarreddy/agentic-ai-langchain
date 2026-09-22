import { humanInTheLoopMiddleware, HumanMessage, tool } from "langchain";
import { Command, MemorySaver } from "@langchain/langgraph";
import z from "zod";
import createLLMAgent from "../../../index.js";

// Tools
const read_email_tool = tool(
  async ({ email_id }) => `Email content for ID: ${email_id}`,
  {
    name: "read_email",
    description: "Mock function to read an email by its ID",
    schema: z.object({
      email_id: z.string().describe("Unique email id"),
    }),
  },
);

const send_email_tool = tool(
  async ({ recipient, subject, body }) =>
    `Email sent to recipient ${recipient} with subject ${subject}`,
  {
    name: "send_email",
    description: "Mock function to send an email",
    schema: z.object({
      recipient: z.string().email(),
      subject: z.string(),
      body: z.string(),
    }),
  },
);

// HITL Middleware (allowedDecisions uses uppercase values)
const hitl = humanInTheLoopMiddleware({
  interruptOn: {
    send_email: {
      allowedDecisions: ["approve", "edit", "reject"],
      description: "⚠️ Sending an external email requires human authorization",
    },
    read_email: false,
  },
});

// Checkpointer
const checkpointer = new MemorySaver();

// Agent
const agent = createLLMAgent([read_email_tool, send_email_tool], undefined, {
  middleware: [hitl],
  checkpointer,
});

// Fix 1: Change 'configuration' to 'configurable'
const config = { configurable: { thread_id: "user-session-123" } };

const messages = [
  new HumanMessage(
    "Send an email to customer@support.com with subject Greeting and body Hello, Customer support team",
  ),
];

// Initial Run
const response = await agent.invoke({ messages }, config);

if (response.__interrupt__) {
  const interruptInfo = response.__interrupt__[0];
  console.log("\n[INTERRUPT TRIGGERED]");
  console.log("Details:", JSON.stringify(interruptInfo.value, null, 2));

  console.log("\n--- Human Action: Approved ---");

  // Fix 2: Added missing 'await' keyword
  const finalResult = await agent.invoke(
    new Command({
      resume: {
        decisions: [{ type: "approve" }],
      },
    }),
    config,
  );

  console.log("\n--- Final Agent Response ---");
  const lastMsg = finalResult.messages[finalResult.messages.length - 1];
  console.log(lastMsg.content);
}
