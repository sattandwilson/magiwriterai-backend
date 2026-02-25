import dotenv from "dotenv";
dotenv.config();
import newEmailPrompt from "../prompts/newEmailPrompt.js";
import OpenAI from "openai";

const newEmailController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const emailForm = req.body;
    if (!emailForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = newEmailPrompt(emailForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ newEmail: aiResponse });
  } catch (error) {
    console.error("Error in newEmailController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { newEmailController };
