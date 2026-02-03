import { groq } from "../config/groq.js";

export async function extractPainPoints(dataset) {
  const blob = dataset.map(d => d.rawText).join("\n");

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You analyze CRM data to extract recurring buyer pain points. Output STRICT JSON only."
      },
      {
        role: "user",
        content: `
Analyze the following REAL CRM data.
- Group similar pains
- Rank by frequency
- Provide example snippets

DATA:
${blob}

Return JSON:
[
  {
    "label": "",
    "description": "",
    "frequency": "",
    "examples": []
  }
]
`
      }
    ]
  });

  return JSON.parse(completion.choices[0].message.content);
}
