import dotenv from "dotenv";
dotenv.config();
import reportPrompt from "../prompts/reportPrompt.js";
import OpenAI from "openai";

const reportController = async (req, res) => {
    const ai = new OpenAI();
  try {
    const reportFrom = await req.body;
    if (!reportFrom) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = reportPrompt(reportFrom);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({report: aiResponse});
  } catch (error) {
    console.error("Error in reportController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { reportController };
