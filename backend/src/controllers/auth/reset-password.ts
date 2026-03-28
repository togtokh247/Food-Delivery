import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../database/schema/user.schema.js";

export const resetPassword: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });

  return res.status(200).json({ message: "Password updated successfully" });
};
