import { HfInference } from "@huggingface/inference";
import axios from "axios";
import { extractSections } from "../utils/airesponse.utility.js";
import { uploadoncloudinary } from "../utils/cloudinary.utility.js";

export const handleAIRequest = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path; // Path to the uploaded image

    // ✅ Upload image to Cloudinary
    const uploadRes = await uploadoncloudinary(imagePath, {
      folder: "plant_health",
    });

    console.log("✅ Image uploaded to Cloudinary:", uploadRes.secure_url);

    // ✅ Prepare request payload for Crop Health API
    const requestBody = {
      images: [uploadRes.secure_url], // ✅ Use Cloudinary URL instead of Base64
      latitude: 49.207,
      longitude: 16.608,
      similar_images: true,
    };

    // ✅ Send request to Kindwise API
    const apiResponse = await axios.post(
      `${process.env.KINDWISE_API_URL}/identification`,
      requestBody,
      {
        headers: {
          "Api-Key": process.env.KINDWISE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Kindwise API response:", apiResponse.data);
    // ✅ Delete the uploaded file from local storage after upload
    // fs.unlinkSync(imagePath);

    // ✅ Return response from Kindwise API to client
    return res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(error.response?.status || 500).json({
      error: "Failed to process image",
      details: error.response?.data || error.message,
    });
  }
};

export const handleTexttoText = async (req, res) => {
  console.log(req.body);
  const { input } = req.body;

  try {
    const client = new HfInference(`${process.env.HFTEXT2TEXT}`);

    const chatCompletions = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content:
            input +
            " Provide a clear, structured, and direct response to the question. Use headings, bullet points, and numbered lists as human response .",
        },
      ],
      provider: "together",
      max_tokens: 500,
    });

    console.log(
      "chatCompletion.choices[0].message",
      chatCompletions.choices[0].message
    );
    console.log("chatCompletion.choices[0]", chatCompletions.choices[0]);

    const { thinkContent, responseContent } = extractSections(
      chatCompletions.choices[0].message.content
    );

    console.log(responseContent);
    res.status(200).json({ chatCompletion: responseContent });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const handleText = async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Input text is required." });
  }

  try {
    const client = new HfInference(process.env.HFTEXT2TEXT);

    const chatCompletions = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content:
            input +
            " Answer directly and concisely. Do not include any thoughts, explanations, or meta comments. Use headings, bullet points, and numbered lists only if relevant.",
        },
      ],
      provider: "together",
      max_tokens: 500,
    });

    // Use extractSections to remove <think> section
    const { responseContent } = extractSections(
      chatCompletions.choices[0].message.content
    );

    res.status(200).json({ chatCompletion: responseContent });
  } catch (error) {
    console.error("Error in handleText controller:", error);
    res.status(500).json({ error: "Failed to process AI request" });
  }
};
