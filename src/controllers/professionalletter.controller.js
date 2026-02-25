import dotenv from "dotenv";
dotenv.config();
import professionalLetterPrompt from "../prompts/professionalLetterPrompt.js";
import OpenAI from "openai";

const professionalletterController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const professionalLetterForm = req.body;
    if (!professionalLetterForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = professionalLetterPrompt(professionalLetterForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ professionalLetter: aiResponse });
  } catch (error) {
    console.error("Error in professionalletterController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { professionalletterController };
