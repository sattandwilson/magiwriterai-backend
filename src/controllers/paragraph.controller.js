import dotenv from "dotenv";
dotenv.config();
import paragraphPrompt from "../prompts/paragraphPrompt.js";
import OpenAI from "openai";

const paragraphController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const paragraphForm = req.body;
    if (!paragraphForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = paragraphPrompt(paragraphForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ paragraph: aiResponse });
  } catch (error) {
    console.error("Error in paragraphController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { paragraphController };
