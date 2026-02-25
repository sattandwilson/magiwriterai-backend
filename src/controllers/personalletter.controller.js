import dotenv from "dotenv";
dotenv.config();
import personalLetterPrompt from "../prompts/personalLetterPrompt.js";
import OpenAI from "openai";

const personalletterController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const personalLetterForm = req.body;
    if (!personalLetterForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = personalLetterPrompt(personalLetterForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ personalLetter: aiResponse });
  } catch (error) {
    console.error("Error in personalletterController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { personalletterController };
