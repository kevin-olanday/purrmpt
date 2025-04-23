import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { prompt, promptType, maxTokens, temperature, role, style } = body;
    console.log("Received prompt:", prompt);
    console.log("Received promptType:", promptType);

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (!promptType || !role || !style) {
      return NextResponse.json({ error: "Prompt type, role, and style are required." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are a prompt optimization assistant.

You take raw ideas from users and convert them into highly effective prompts for other AI models to respond to (like ChatGPT, DALL-E, or Codex).

Your job is to rewrite the idea to sound:
- More expressive, detailed, and creative
- Aligned to the user’s ROLE and STYLE
- Naturally phrased and complete

Do NOT answer the prompt. Do NOT fulfill it. Only enhance it into a better version of itself.

Maximize the max token size but Make sure your output ends with a complete thought. Preserve raw emotional tone when relevant. Avoid sanitizing edgy or honest expressions.
`.trim()
        },
        {
          role: "user",
          content: `
Raw Idea:
"${prompt}"

Type: ${promptType}
Role: ${role}
Style: ${style}

Enhance this raw idea into a compelling, high-impact AI prompt.  
Keep the edge, honesty, and tone of the original idea.
Use the selected role and style to shape the voice, perspective, and intensity — not to sterilize the message.

Do not answer it. Just transform it into the best version of itself, as an AI prompt.
Return only the rewritten prompt.
`.trim()
        },
      ],
      max_tokens: maxTokens || 800,
      temperature: temperature || 0.8,
    });

    const result = response.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json({ error: "No response from OpenAI." }, { status: 500 });
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("OpenAI API error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI API." },
      { status: 500 }
    );
  }
}
