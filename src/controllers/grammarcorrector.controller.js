import grammarcorrectorPrompt from "../prompts/grammarcorrectorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const grammarcorrectorController = async (req, res) => {
  try {
    const {text} = await req.body;
    if (!text) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = grammarcorrectorPrompt({ input: text });
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ correctedGrammar: aiResponse });
  } catch (error) {
    console.error("Error in grammarcorrectorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { grammarcorrectorController };
