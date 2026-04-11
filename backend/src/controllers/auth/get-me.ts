import type { RequestHandler, Request } from "express";
import { UserModel } from "../../database/schema/user.schema.js";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = (req as Request & { userId?: string }).userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get me failed", error);
    return res.status(500).json({ message: "Unable to load user right now" });
  }
};
