import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login: RequestHandler = async (req, res) => {
  const { identifier, email, username, password } = req.body;
  const normalizedIdentifier = identifier ?? email ?? username;

  if (!normalizedIdentifier || !password) {
    return res.status(400).json({ message: "Email/username and password are required" });
  }

  const user = await UserModel.findOne({
    $or: [{ email: normalizedIdentifier }, { username: normalizedIdentifier }],
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  const { password: userPassword, ...rest } = user.toObject();

  const isPasswordValid = await bcrypt.compare(password, userPassword);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email/username or password is wrong" });
  }

  const accessToken = jwt.sign({ user: rest }, "isthissecret");

  res.status(200).json({
    user: rest,
    accessToken,
  });
};
