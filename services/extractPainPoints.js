import { openai } from "../config/openai.js";

export async function extractPainPoints(dataset) {
  const blob = dataset.map(d => d.rawText).join("\n");

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [{
      role: "user",
      content: `
Analyze real CRM data and return 3–7 pain points.
Show frequency and examples.
DATA:
${blob}

Return strict JSON only.
`
    }]
  });

  return JSON.parse(res.choices[0].message.content);
}
