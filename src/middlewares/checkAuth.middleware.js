import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const checkAuth = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const authToken = req.cookies.authAccessToken;
    if (!authToken) {
      res.status(401).json({ message: "Unauthorized user!" });
      return;
    }
    const userId = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
    if (!userId) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    if (user.email !== userEmail) {
      res.status(403).json({ message: "Access forbidden!" });
      return;
    }
    next();
  } catch (error) {
    console.log("auth middleware error: ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default checkAuth;
