import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    address: { type: String, required: false },
  },
  { timestamps: true }
);

export const userModel = model(`User`, userSchema);
