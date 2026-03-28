import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import bcrypt from "bcrypt";

export const register: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Username, email and password are required" });
  }

  const isUserNameExist = await UserModel.findOne({ username });

  if (isUserNameExist)
    return res.status(400).json({ message: "Username already exists" });

  const isEmailExist = await UserModel.findOne({ email });

  if (isEmailExist)
    return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    username,
    password: hashedPassword,
    email,
  });

  const { password: userPassword, ...rest } = user.toObject();
  res.status(200).json({ user: rest });
};
