import createLLMAgent from "../index.js";

const agent = createLLMAgent();

const stream = await agent.stream(
  {
    messages: [
      {
        role: "human",
        content: "Write a 500 word paragraph on space technology ",
      },
    ],
  },
  {
    streamMode: "messages",
  },
);

for await (const [messageChunk] of stream) {
  process.stdout.write(messageChunk.content as string);
}

process.stdout.write("\n");
