import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateEncouragement = async (topic: string): Promise<string> => {
  const client = getClient();
  if (!client) return "Connect API Key to get inspired.";

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are 'The Movement AI', a digital youth pastor/mentor for an urban church. 
      Topic: ${topic}. 
      Task: Give a short, punchy, high-energy encouragement or relevant bible verse interpretation related to the topic. 
      Tone: Urban, Gen-Z friendly, authentic, but spiritually grounded. Use emojis sparingly. Max 50 words.`,
    });
    return response.text || "Keep moving forward.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The signal is weak, but faith is strong. Try again later.";
  }
};