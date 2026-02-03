import { groq } from "../config/groq.js";

export async function generateMessaging(painPoints) {
  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content:
          "You generate marketing and sales messaging grounded in CRM pain points."
      },
      {
        role: "user",
        content: `
Generate messaging for each pain point below.

For each pain:
- 3 email subject lines
- 2 opening hooks
- 1 headline + subhead
- 3 sales talk-track bullets

Pain Points:
${JSON.stringify(painPoints)}

Return STRICT JSON only.
`
      }
    ]
  });

  return JSON.parse(completion.choices[0].message.content);
}
