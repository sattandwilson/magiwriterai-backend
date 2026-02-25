import captiongeneratorPrompt from "../prompts/captiongeneratorPrompt.js";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const captiongeneratorController = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;
    if (!imageBuffer || !mimeType) {
      return res.status(400).json({ message: "Bad request!" });
    }
    const base64Image = imageBuffer.toString("base64");
    const prompt = captiongeneratorPrompt();
    const ai = new OpenAI();
    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
            {
              type: "input_image",
              image_url: `data:${mimeType};base64,${base64Image}`,
            },
          ],
        },
      ],
    });
    console.log("AI response:", response);
    const aiResponse = response.output_text;
    res.status(200).json({ caption: aiResponse });
  } catch (error) {
    console.error("Error in captiongeneratorController:", error);
    return res.status(500).json({ message: "Server error!" });
  }
};

export { captiongeneratorController };
