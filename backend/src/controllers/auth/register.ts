import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const register: RequestHandler = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password;
    const email = req.body.email?.trim().toLowerCase();

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    const isUserNameExist = await UserModel.findOne({ username });

    if (isUserNameExist) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const isEmailExist = await UserModel.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      password: hashedPassword,
      email,
    });

    const { password: userPassword, ...rest } = user.toObject();

    return res.status(200).json({ user: rest });
  } catch (error) {
    if (
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError
    ) {
      return res.status(400).json({ message: error.message });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      const duplicateField = Object.keys(
        (error as { keyPattern?: Record<string, number> }).keyPattern ?? {}
      )[0];

      if (duplicateField === "email") {
        return res.status(400).json({ message: "Email already exists" });
      }

      if (duplicateField === "username") {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    console.error("Register failed", error);
    return res.status(500).json({ message: "Unable to create account right now" });
  }
};
