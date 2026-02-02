import { openai } from "../config/openai.js";

export async function generateMessaging(painPoints) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.4,
    messages: [{
      role: "user",
      content: `
Create email hooks, headlines and sales talk tracks
for each pain point below.

${JSON.stringify(painPoints)}

Return JSON only.
`
    }]
  });

  return JSON.parse(res.choices[0].message.content);
}
