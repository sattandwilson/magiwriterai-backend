import dotenv from "dotenv";
dotenv.config();
import noticePrompt from "../prompts/noticePrompt.js";
import OpenAI from "openai";

const noticeController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const noticeForm = await req.body;
    if (!noticeForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = noticePrompt(noticeForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ notice: aiResponse });
  } catch (error) {
    console.error("Error in noticeController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { noticeController };
