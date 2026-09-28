import { createMiddleware } from "langchain";

const errorHandlingMiddleware = createMiddleware({
  name: "error-handling",
  wrapToolCall: async (request, handler) => {
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(`🔧 Tool attempt ${attempt}`);
        const result = await handler(request);
        console.log("✅ Tool succeeded");
        return result;
      } catch (error) {
        console.log(`❌ Tool failed on attempt ${attempt}`);
        if (attempt === maxRetries) {
          console.log("🚨 Maximum retries reached");
          throw error;
        }
        console.log("🔄 Retrying...");
      }
    }
    
    throw new Error("Tool execution failed");
  },
});

export default errorHandlingMiddleware;
