import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const response = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gemini-1.5-flash",
    messages: [{ role: "system", content: `Generate a React canvas animation to explain ${topic}.` }],
  }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });

  return NextResponse.json({ canvasCode: response.data.choices[0].message.content });
}
