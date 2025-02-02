import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body
    const { prompt, apiKey } = await req.json();

    // Validate that prompt and apiKey are provided
    if (!prompt) {
      return new Response(
        JSON.stringify({ success: false, message: "Prompt is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    

    // Initialize GoogleGenerativeAI with the user's API key
    const genAI = new GoogleGenerativeAI(apiKey?apiKey:process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the response using the provided prompt
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Send back the generated content
    return new Response(
      JSON.stringify({ success: true, reply: responseText }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to generate response",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
