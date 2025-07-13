import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "models/gemini-1.5-flash"; // 👈 recommended for free users

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const response = result.response;
  return response.text();
}

export default runChat;
