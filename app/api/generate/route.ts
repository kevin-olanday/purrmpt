import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ✅ Load key locally and validate early
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

// ✅ Initialize OpenAI client with local constant
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // Debugging

    const { prompt, promptType, maxTokens, temperature } = body;
    console.log("Received prompt:", prompt);
    console.log("Received promptType:", promptType);

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (!promptType) {
      return NextResponse.json({ error: "Prompt type is required." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
    You are a prompt-enhancing assistant. 
    Your job is to take a raw user idea and expand it into a high-quality, well-structured prompt, 
    tailored for the selected output type: text, image, or code. 
    Make it long, creative, vivid, and useful. Use up to the full response length if necessary.
          `.trim(),
        },
        {
          role: "user",
          content: `
          Enhance this idea into a long, high-quality ${promptType} prompt.
          
          Idea:
          "${prompt}"
          
          Make the result rich, vivid, detailed, and use the maximum space allowed if helpful.
          
          Respond with only the enhanced prompt.
          `.trim(),
        },
      ],
      max_tokens: maxTokens || 300, // Default to 300
      temperature: temperature || 0.8, // Default to 0.8
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
