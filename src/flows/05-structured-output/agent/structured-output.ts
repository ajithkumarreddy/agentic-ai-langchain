import z from "zod";
import createLLMAgent from "../../../index.js";
import getWeather from "../../../tools/weather.tool.js";

// Weather report schema
const WeatherReportSchema = z.object({
  city: z.string().describe("The name of the requested city."),
  temperature: z.string().describe("Current temperature with units"),
  condition: z.string().describe("Brief description of atmospheric condition"),
  clothingRecommendations: z
    .string()
    .describe("Practical advice on what to wear based on weather"),
});

// type
type WeatherReport = z.infer<typeof WeatherReportSchema>;

// agent
const agent = createLLMAgent([getWeather], WeatherReportSchema);

const response = await agent.invoke({
  messages: [{ role: "user", content: "What should I wear in tokyo today?" }],
});

console.log(response?.structuredResponse);
