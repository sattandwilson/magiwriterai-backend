import outlinegeneratorPrompt from "../prompts/outlinegeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const outlinegeneratorController = async (req, res) => {
  try {
    const { topic, keywords } = req.body;
    if (!topic || !keywords) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = outlinegeneratorPrompt({topic, keywords});
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ outline: aiResponse });
  } catch (error) {
    console.error("Error in outlinegeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {outlinegeneratorController};
