import replygeneratorPrompt from "../prompts/replygeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const replygeneratorController = async (req, res) => {
  try {
    const { content, pov } = await req.body;
    if (!content || !pov) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = replygeneratorPrompt({content, pov});
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({reply: aiResponse});
  } catch (error) {
    console.error("Error in replygeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {replygeneratorController};
