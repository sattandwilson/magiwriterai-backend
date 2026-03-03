import express from "express";
import connectToDb from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import "./config/passport.js";
import authRouter from "./routes/auth.route.js";
import generateRoute from "./routes/generate.route.js";
import downloadRouter from "./routes/download.route.js";
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: "https://www.magiwriter.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/generate", generateRoute);
app.use("/download", downloadRouter);

try {
  connectToDb().then(() => {
    app.listen(PORT, "127.0.0.1", () => {
      console.log("Magiwriter server is running on port: ", PORT);
    });
  });
} catch (error) {
  console.log(
    "Internal server error! Server is not listening! error info: ",
    error
  );
}
