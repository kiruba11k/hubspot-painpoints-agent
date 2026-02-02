import { openai } from "../config/openai.js";

export async function generateMessaging(painPoints, channel = "email") {
  const prompt = `
Create messaging grounded in these pains.

Pain Points:
${JSON.stringify(painPoints)}

For each pain:
- 3 email subject lines
- 2 opening hooks
- 1 headline + subhead
- 3 sales talk track bullets

Output structured JSON.
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4
  });

  return JSON.parse(res.choices[0].message.content);
}
