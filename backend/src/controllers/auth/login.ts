import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });

<<<<<<< HEAD
  const { password: userPassword, ...rest } = user.toObject();
=======
  const { password: userPassword, ...rest } = user;
>>>>>>> f563bae (m)

  if (userPassword !== password)
    return res.status(401).json({ message: "Username or password is wrong" });

  const accessToken = jwt.sign({ user: rest }, "isthissecret");

  res.status(200).json({
    user: rest,
    accessToken,
  });
};
