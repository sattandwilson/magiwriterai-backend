import seometadescriptiongeneratorPrompt from "../prompts/seometadescriptiongeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const seometadescriptiongeneratorController = async (req, res) => {
  try {
    const { summary, keywords } = await req.body;
    if (!summary || !keywords) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = seometadescriptiongeneratorPrompt({summary, keywords});
  const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({seometadescription: aiResponse});
  } catch (error) {
    console.error("Error in seometadescriptiongeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {seometadescriptiongeneratorController};
