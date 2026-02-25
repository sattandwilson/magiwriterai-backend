import express from "express";
import passport from "passport";
import { getUserController, googleAuthCallbackController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  googleAuthCallbackController
);

authRouter.get("/user", getUserController);

export default authRouter;
