import imagegeneratorPrompt from "../prompts/imagegeneratorPrompt.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const articleImageGenController = async (req, res) => {
  try {
    const { idea } = req.body;
    console.log("idea:", idea);
    if (!idea) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const prompt = imagegeneratorPrompt({ idea });
    const ai = new OpenAI();
    const response = await ai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1536x1024",
    });

    // Extract base64 image
    const imagePart = response.data[0].b64_json;

    if (!imagePart) {
      return res.status(500).json({ message: "No image returned from AI." });
    }

    res.status(200).json({
      image: imagePart,
    });
  } catch (error) {
    console.error("Error in article image generator controller!:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { articleImageGenController };
