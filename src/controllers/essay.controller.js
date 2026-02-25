import dotenv from "dotenv";
dotenv.config();
import essayPrompt from "../prompts/essayPrompt.js";
import OpenAI from "openai";

const essayController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const essayForm = await req.body;
    if (!essayForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = essayPrompt(essayForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ essay: aiResponse });
  } catch (error) {
    console.error("Error in essayController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { essayController };
