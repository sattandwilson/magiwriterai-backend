import paraphraserPrompt from "../prompts/paraphraserPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const paraphraserController = async (req, res) => {
  try {
    const {text, lenth} = req.body;
    if (!text || !lenth) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = paraphraserPrompt({input: text, length: lenth});
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ paraphrasedText: aiResponse });
  } catch (error) {
    console.error("Error in paraphraserController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {paraphraserController};
