import type { RequestHandler, Request } from "express";
import { UserModel } from "../../database/schema/user.schema.js";

export const getMe: RequestHandler = async (req, res) => {
  const userId = (req as Request & { userId?: string }).userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
};
