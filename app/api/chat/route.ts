// app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// This function handles POST requests to the /api/chat endpoint
export async function POST(request: NextRequest) {
  // Get the user's prompt from the request body
  const { prompt } = await request.json();

  // IMPORTANT: Access the API key securely from environment variables
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // If the API key is not set, return a 500 error
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Send the AI's response back to the client
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from AI" },
      { status: 500 }
    );
  }
}