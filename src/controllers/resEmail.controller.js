import dotenv from "dotenv";
dotenv.config();
import resEmailPrompt from "../prompts/resEmailPrompt.js";
import OpenAI from "openai";

const resEmailController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const resEmailForm = await req.body;
    if (!resEmailForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = resEmailPrompt(resEmailForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({resEmail: aiResponse});
  } catch (error) {
    console.error("Error in resEmailController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { resEmailController };
