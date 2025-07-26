import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyB8bBRCCLu5sWj7eLTG2BASYfIuDOhdgng");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const getAIResponse = async ({ input, image }) => {
  try {
    const parts = [{ text: input }];

    if (image) {
      parts.push({
        inlineData: {
          mimeType: "image/png", // Adjust if different format (e.g., "image/jpeg")
          data: image, // Base64-encoded image string
        },
      });
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });
    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI response failed");
  }
};
