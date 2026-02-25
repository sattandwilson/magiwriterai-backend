import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails?.[0].value,
          profileImageUrl: profile.photos?.[0].value,
        });
      }
      return done(null, user._id);
    }
  )
);

passport.serializeUser((user, done)=> {
  done(null, user._id)
});

passport.deserializeUser(async(id, done)=> {
  const user = await User.findOne({_id: id});
  done(null, user);
})

export default passport;
