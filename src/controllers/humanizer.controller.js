import humanizerPrompt from "../prompts/humanizerPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const humanizerController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = humanizerPrompt(text);
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ humanizedText: aiResponse });
  } catch (error) {
    console.error("Error in humanizerController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {humanizerController};
