import mongoose from "mongoose";
import env from "./env.js";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
  if (!env.MONGO_URI) {
    console.warn("[OmniSocial] MONGO_URI is empty in server/.env. Running in standby mode.");
    return null;
  }

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    if (!env.isProduction) {
      console.log(`[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    }
    return conn;
  } catch (error) {
    // Simple English Comment:
    // If local MongoDB is not running, log a warning without killing the server process.
    console.warn("[OmniSocial] MongoDB connection standby. Server will keep running:", error.message);
    return null;
  }
};

mongoose.connection.on("disconnected", () => {
  if (!env.isProduction) console.warn("[db] MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
  if (!env.isProduction) console.log("[db] MongoDB reconnected.");
});

export default connectDB;
