import { openai } from "../config/openai.js";

export async function extractPainPoints(dataset) {
  const textBlob = dataset.map(d => d.rawText).join("\n");

  const prompt = `
You are analyzing REAL CRM data.

Task:
1. Identify 3–7 recurring pain points
2. Group similar problems
3. Count frequency
4. Return example snippets

DATA:
${textBlob}

Return JSON:
[
  {
    "label": "",
    "description": "",
    "frequency": "percentage",
    "examples": ["", ""]
  }
]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  return JSON.parse(response.choices[0].message.content);
}
