import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ✅ Load key locally and validate early
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

// ✅ Initialize OpenAI client with local constant
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if needed
      messages: [
        { role: "system", content: "You are a helpful prompt-enhancing assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.8,
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
