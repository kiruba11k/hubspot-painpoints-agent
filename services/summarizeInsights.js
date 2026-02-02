import { openai } from "../config/openai.js";

export async function summarizeSegmentInsights(painPoints, metadata) {
  const prompt = `
Summarize this segment using REAL insights.

Segment:
${JSON.stringify(metadata)}

Pain Points:
${JSON.stringify(painPoints)}

Output markdown with:
- Who this segment is
- Top pains
- Why they care
- Key objections
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  return res.choices[0].message.content;
}
