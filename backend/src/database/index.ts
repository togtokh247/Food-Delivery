import { connect } from "mongoose";
import { config } from "../config.js";

export const connectToDatabase = async () => {
  if (!config.mongoUri) {
    throw new Error("MONGODB_URI is required to connect to the database");
  }

  await connect(config.mongoUri);
};
