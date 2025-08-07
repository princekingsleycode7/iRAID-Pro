
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are Rose, a friendly and helpful AI chatbot. Your purpose is to provide information about the company and answer any questions users might have. Be concise, professional, and welcoming.',
  },
});

export const sendMessageStream = async (message: string) => {
    try {
        const response = await chat.sendMessageStream({ message });
        return response;
    } catch (error) {
        console.error("Gemini API error:", error);
        throw new Error("Failed to get response from AI.");
    }
};
