import env from "dotenv";
env.config();
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const googleAuthCallbackController = async (req, res) => {
  try {
    const accessToken = jwt.sign(
      { userId: req.user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    await res.cookie("authAccessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.redirect("https://www.magiwriter.com/dashboard");
  } catch (error) {
    console.log("Error in auth callback controller! more info: ", error);
  }
};

const getUserController = async (req, res) => {
  try {
    const token = req.cookies.authAccessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;
    const user = await User.findOne({ _id: userId }).select(
      "-__v -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in get user controller! more info: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { googleAuthCallbackController, getUserController };
