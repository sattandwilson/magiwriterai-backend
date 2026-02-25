import faqgeneratorPrompt from "../prompts/faqgeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const faqgeneratorController = async (req, res) => {
  try {
    const { content } = await req.body;
    if (!content) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = faqgeneratorPrompt(content);
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ faq: aiResponse });
  } catch (error) {
    console.error("Error in faqgeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { faqgeneratorController };
