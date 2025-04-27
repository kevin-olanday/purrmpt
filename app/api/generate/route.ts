import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

interface PromptRequestBody {
  prompt: string;
  promptType: string;
  maxTokens?: number;
  temperature?: number;
  role: string;
  style: string;
}

const DEFAULT_MAX_TOKENS = 800;
const MAX_TOKEN_LIMIT = 1000;
const CONCISE_TOKEN_THRESHOLD = 350;

// Classify prompt as "technical" or "creative"
function analyzePrompt(prompt: string): "technical" | "creative" {
  const keywordGroups = [
    { type: "technical", keywords: [
      "why", "how", "what is", "explain", "define", "calculate",
      "difference", "compare", "steps", "process", "reason", "cause", "effect",
      "science", "scientific", "data", "code", "program", "function", "method",
      "algorithm", "syntax", "error", "bug", "fix", "solution", "describe", "analyze", "analysis"
    ] },
    { type: "creative", keywords: [
      "story", "imagine", "write a poem", "novel", "creative", "draw", "paint",
      "fantasy", "adventure", "character", "scene", "art", "illustrate",
      "describe a world", "narrative", "fiction", "dream", "magical", "mystery",
      "explore", "journey", "emotion", "feelings", "vivid", "world-building"
    ] }
  ];

  const promptLower = prompt.toLowerCase();

  for (const group of keywordGroups) {
    for (const keyword of group.keywords) {
      if (promptLower.startsWith(keyword) || promptLower.includes(` ${keyword}`)) {
        return group.type as "technical" | "creative";
      }
    }
  }
  // Default to technical for safety
  return "technical";
}

function buildSystemPrompt(promptType: string, maxTokens: number) {
  const encourageExpansion =
    maxTokens < CONCISE_TOKEN_THRESHOLD
      ? "Prioritize conciseness and focus, but ensure the output ends on a complete, natural thought."
      : "Expand thoughtfully to use the available token space, providing detail, nuance, and richness without unnecessary repetition or verbosity. Always end on a complete, natural thought.";

  if (promptType === "text") {
    return `
You are a prompt optimization assistant.

Rewrite user ideas into highly effective prompts for AI text models like ChatGPT.
Encourage rich, natural phrasing, emotional depth, and clear, complete ideas.
${encourageExpansion}
Never answer or fulfill the prompt—only enhance it.
`.trim();
  }
  if (promptType === "image") {
    return `
You are a prompt optimization assistant.

Rewrite user ideas into highly effective prompts for AI image models like DALL-E or Midjourney.
Encourage vivid, concrete visual descriptions: subject, composition, colors, style, and lighting.
Focus on clarity and visual detail.
${encourageExpansion}
Never answer or fulfill the prompt—only enhance it.
`.trim();
  }
  if (promptType === "code") {
    return `
You are a prompt optimization assistant.

Rewrite user ideas into highly effective prompts for AI coding models.
Encourage technical precision, step-by-step clarity, and explicit requirements.
Avoid emotional or metaphorical language.
${encourageExpansion}
Never answer or fulfill the prompt—only enhance it.
`.trim();
  }
  // Default
  return `
You are a prompt optimization assistant.

Rewrite user ideas into highly effective prompts for AI models.
Focus on clarity, completeness, and matching the user's intent and style.
${encourageExpansion}
Never answer or fulfill the prompt—only enhance it.
`.trim();
}

function buildUserMessage(
  promptType: string,
  prompt: string,
  role: string,
  style: string,
  maxTokens: number
) {
  const expansionInstruction =
    maxTokens < CONCISE_TOKEN_THRESHOLD
      ? "- Prioritize conciseness and focus, but always end on a complete, natural thought."
      : "- Expand thoughtfully to use the available token space, providing detail, nuance, and richness without unnecessary repetition or verbosity. Always end on a complete, natural thought.";

  const promptNature = analyzePrompt(prompt);

  let enhancementInstructions = "";

  if (promptType === "text") {
    enhancementInstructions = promptNature === "creative"
      ? [
          "- Emphasize imagination, emotional depth, and vivid storytelling if appropriate.",
          "- Use natural, expressive language.",
          expansionInstruction,
          "- Adapt tone and phrasing to the user's Role and Preferred Style.",
          "- Do not answer or fulfill the prompt, only rewrite and enhance it.",
          "- Return only the rewritten prompt text, no explanations."
        ].join("\n")
      : [
          "- Prioritize clarity, factual accuracy, and simplicity.",
          "- Use direct, precise language.",
          expansionInstruction,
          "- Adapt tone and phrasing to the user's Role and Preferred Style.",
          "- Do not answer or fulfill the prompt, only rewrite and enhance it.",
          "- Return only the rewritten prompt text, no explanations."
        ].join("\n");

    return `
Raw Idea:
"${prompt}"

Prompt Type: ${promptType}
User Role: ${role}
Preferred Style: ${style}

Enhance this idea into a more effective AI prompt for a text model.

Instructions:
${enhancementInstructions}
`.trim();
  }

  if (promptType === "image") {
    enhancementInstructions = promptNature === "creative"
      ? [
          "- Emphasize vivid imagination and creative visual storytelling.",
          "- Use rich, descriptive language for scenes, colors, lighting, and style.",
          expansionInstruction,
          "- Adapt tone and phrasing to the user's Role and Preferred Style.",
          "- Do not answer or fulfill the prompt, only rewrite and enhance it.",
          "- Return only the rewritten prompt text, no explanations."
        ].join("\n")
      : [
          "- Prioritize visual clarity and concrete details: subject, composition, colors, lighting, style.",
          "- Use precise, descriptive language.",
          expansionInstruction,
          "- Adapt tone and phrasing to the user's Role and Preferred Style.",
          "- Do not answer or fulfill the prompt, only rewrite and enhance it.",
          "- Return only the rewritten prompt text, no explanations."
        ].join("\n");

    return `
Raw Idea:
"${prompt}"

Prompt Type: ${promptType}
User Role: ${role}
Preferred Style: ${style}

Enhance this idea into a more effective AI prompt for image generation.

Instructions:
${enhancementInstructions}
`.trim();
  }

  if (promptType === "code") {
    // Always treat code as technical
    enhancementInstructions = [
      "- Emphasize precision, literal instructions, and technical clarity.",
      "- Use step-by-step or explicit requirements as needed.",
      "- Avoid emotional or metaphorical language.",
      expansionInstruction,
      "- Adapt tone and phrasing to the user's Role and Preferred Style.",
      "- Do not answer or fulfill the prompt, only rewrite and enhance it.",
      "- Return only the rewritten prompt text, no explanations."
    ].join("\n");

    return `
Raw Idea:
"${prompt}"

Prompt Type: ${promptType}
User Role: ${role}
Preferred Style: ${style}

Enhance this idea into a more effective AI prompt for code or technical output.

Instructions:
${enhancementInstructions}
`.trim();
  }

  // Default
  enhancementInstructions = [
    "- Focus on clarity, completeness, and matching the user's intent and style.",
    expansionInstruction,
    "- Do not answer or fulfill the prompt, only rewrite and enhance it.",
    "- Return only the rewritten prompt text, no explanations."
  ].join("\n");

  return `
Raw Idea:
"${prompt}"

Prompt Type: ${promptType}
User Role: ${role}
Preferred Style: ${style}

Enhance this idea into a more effective AI prompt.

Instructions:
${enhancementInstructions}
`.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PromptRequestBody;

    if (process.env.NODE_ENV === "development") {
      console.log("Received request body:", body);
    }

    const { prompt, promptType, maxTokens, temperature, role, style } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }
    if (!promptType || !role || !style) {
      return NextResponse.json({ error: "Prompt type, role, and style are required." }, { status: 400 });
    }

    let safeMaxTokens = typeof maxTokens === "number" && maxTokens > 0
      ? Math.min(maxTokens, MAX_TOKEN_LIMIT)
      : DEFAULT_MAX_TOKENS;

    const systemPrompt = buildSystemPrompt(promptType, safeMaxTokens);
    const userMessage = buildUserMessage(promptType, prompt, role, style, safeMaxTokens);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: safeMaxTokens,
      temperature: temperature ?? 0.7,
    });

    const result = response.choices?.[0]?.message?.content?.trim();

    if (!result) {
      return NextResponse.json({ error: "No response from OpenAI." }, { status: 500 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("OpenAI API error:", error?.response?.data || error?.message || error);
    }
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI API." },
      { status: 500 }
    );
  }
}
