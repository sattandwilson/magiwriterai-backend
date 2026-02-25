import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(mongoUri);
    console.log("Database connection has been established.");
  } catch (error) {
    console.log("Error connecting to database! more info: ", error);
  }
};

export default connectToDb;
