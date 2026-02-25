import tweetgeneratorPrompt from "../prompts/tweetgeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const tweetgeneratorController = async (req, res) => {
  try {
    const { idea } = await req.body;
    if (!idea) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = tweetgeneratorPrompt(idea);
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });
    const aiResponse = response.output_text;
    res.status(200).json({ tweet: aiResponse });
  } catch (error) {
    console.error("Error in tweetgeneratorController!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export {tweetgeneratorController};
