import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const getUserOrders: RequestHandler = async (req, res) => {
  try {
    const authenticatedRequest = req as typeof req & { userId?: string };

    if (!authenticatedRequest.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await OrderModel.find({
      userId: authenticatedRequest.userId,
    })
      .populate("items.foodId", "name image")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Get user orders failed", error);
    return res.status(500).json({ message: "Unable to load orders right now" });
  }
};
