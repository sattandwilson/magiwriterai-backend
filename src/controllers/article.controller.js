import dotenv from "dotenv";
dotenv.config();
import articlePrompt from "../prompts/articlePrompt.js";
import OpenAI from "openai";

const articleController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const articleForm = await req.body;
    if (!articleForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = articlePrompt(articleForm);
    const response = await ai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });
    const aiResponse = response.output_text;
    res.status(200).json({ article: aiResponse });
    return;
  } catch (error) {
    console.error("Error getting ai article response:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { articleController };
