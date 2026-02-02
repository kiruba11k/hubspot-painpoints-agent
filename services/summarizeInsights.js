import { openai } from "../config/openai.js";

export async function summarizeSegmentInsights(painPoints, metadata) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.3,
    messages: [{
      role: "user",
      content: `
Summarize this segment using only provided insights.

Metadata:
${JSON.stringify(metadata)}

Pain Points:
${JSON.stringify(painPoints)}
`
    }]
  });

  return res.choices[0].message.content;
}
