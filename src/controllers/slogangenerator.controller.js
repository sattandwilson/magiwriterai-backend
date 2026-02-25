import slogangeneratorPrompt from "../prompts/slogangeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const slogangeneratorController = async (req, res) => {
  try {
    const { brand, industry } = await req.body;
    if (!brand || !industry) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = slogangeneratorPrompt({ brand, industry });
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ slogan: aiResponse });
  } catch (error) {
    console.error("Error in slogangeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { slogangeneratorController };
