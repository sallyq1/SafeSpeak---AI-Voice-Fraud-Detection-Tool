import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "", // Safe for server
});

export async function GET() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You generate short, interesting phrases for voice verification. Avoid repeating phrases.",
        },
        {
          role: "user",
          content: "Give me one unique phrase a user can repeat to verify their voice.",
        },
      ],
      model: "mixtral-8x7b-32768",
    });

    const phrase = chatCompletion.choices[0]?.message?.content?.trim();
    return NextResponse.json({ phrase });
  } catch (error) {
    console.error("Groq error:", error);
    return NextResponse.json({ error: "Failed to generate phrase" }, { status: 500 });
  }
}
