import dotenv from "dotenv";
dotenv.config();
import blogPrompt from "../prompts/blogPrompt.js"
import OpenAI from "openai";

const blogController = async (req, res) => {
  try {
    const ai = new OpenAI();
    const blogForm = await req.body;
    if (!blogForm) {
      return res.status(400).json({ message: "Invalid request!" });
    }
    const prompt = blogPrompt(blogForm);
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ blog: aiResponse});
  } catch (error) {
    console.error("Error in blogController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { blogController };
