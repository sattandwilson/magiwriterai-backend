import dotenv from "dotenv";
dotenv.config();
import storyPrompt from "../prompts/storyPrompt.js";
import OpenAI from "openai";

const storyController = async (req, res) => {
  const ai = new OpenAI();
  try {
    const storyForm = await req.body;
    if (!storyForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = storyPrompt(storyForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ story: aiResponse });
  } catch (error) {
    console.error("Error in storyController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { storyController };
