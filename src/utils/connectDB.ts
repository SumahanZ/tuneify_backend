import mongoose from "mongoose";
import log from "../utils/logger";
import env from "../env";

export default async function connectDB() {
  try {
    await mongoose.connect(env.DB_URL);
    log.info("Connected to DB");
  } catch (err) {
    log.error("Could not connect to DB");
    process.exit(1);
  }
}
