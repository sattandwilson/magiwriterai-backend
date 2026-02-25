import seotaggeneratorPrompt from "../prompts/seotaggeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const seotaggeneratorController = async (req, res) => {
  try {
    const { title, keywords } = await req.body;
    if (!title || !keywords) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = seotaggeneratorPrompt({ title, keywords });
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ seotag: aiResponse });
  } catch (error) {
    console.error("Error in seotaggeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { seotaggeneratorController };
