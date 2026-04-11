import { connect } from "mongoose";
import { config } from "../config.js";

export const connectToDatabase = async () => {
  await connect(config.mongoUri);
};
