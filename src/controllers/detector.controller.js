import OpenAI from "openai";
import detectorPrompt from "../prompts/detectorPrompt.js";
import dotenv from "dotenv";
dotenv.config();

const detectorController = async (req, res) => {
  try {
    const {text} = await req.body;
    if (!text) {
      return res.status(400).json({ error: "Bad Request!" });
    }
    const ai = new OpenAI();
    const prompt = detectorPrompt(text);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ detectedText: aiResponse });
  } catch (error) {
    console.error("Error in detectorController:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export { detectorController };
