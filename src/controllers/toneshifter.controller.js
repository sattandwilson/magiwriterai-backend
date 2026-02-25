import toneshifterPrompt from "../prompts/toneshifterPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const toneshifterController = async (req, res) => {
  try {
    const { text, tone } = await req.body;
    if (!text || !tone) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = toneshifterPrompt({text, tone});
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ toneshiftedText: aiResponse });
  } catch (error) {
    console.error("Error in toneshifterController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {toneshifterController};
