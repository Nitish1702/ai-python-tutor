import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCUv6tIOCu3rg6hSZqPrwj_CgvmLLl78jA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { knowledgelevel } = await req.json();

    if (!knowledgelevel) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Knowledge level is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `Generate a structured course outline to teach a kid who is at a ${knowledgelevel} level in Python programming.  

Provide the output as a **list of topic objects** in the following format:  


[
  {  "Introduction to Python" },
  {  "Variables and Data Types" },
  {  "Basic Input and Output" },
  {  "Conditional Statements" },
  {  "Loops in Python" },
  {  "Functions and Modules" },
  {  "Lists and Dictionaries" },
  {  "Basic File Handling" }
]

Ensure the topics are arranged in a logical sequence, starting from the basics and progressing gradually. Keep the course engaging, interactive, and beginner-friendly.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text(); // Correct way to extract text

    return new Response(
      JSON.stringify({ success: true, lessonPlan: responseText }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to generate lesson plan",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
