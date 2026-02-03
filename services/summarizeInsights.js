import { groq } from "../config/groq.js";

export async function summarizeSegmentInsights(painPoints, metadata) {
  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You summarize CRM-driven buyer insights. Do NOT invent data."
      },
      {
        role: "user",
        content: `
Segment Metadata:
${JSON.stringify(metadata)}

Pain Points:
${JSON.stringify(painPoints)}

Produce a clear markdown summary with:
- Who this segment is
- Top pains
- Why they care
- Objections
`
      }
    ]
  });

  return completion.choices[0].message.content;
}
