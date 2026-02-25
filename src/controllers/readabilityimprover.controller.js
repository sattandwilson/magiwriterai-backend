import readabilityPrompt from "../prompts/readabilityPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const readabilityimproverController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = readabilityPrompt(text);
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ improvedText: aiResponse });
  } catch (error) {
    console.error("Error in readabilityimproverController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {readabilityimproverController};
