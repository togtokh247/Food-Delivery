import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { OrderModel } from "../../database/schema/order.schema.js";

type AuthenticatedRequest = {
  userId?: string;
  body: {
    items?: OrderItemInput[];
  };
};

type OrderItemInput = {
  foodId?: string;
  quantity?: number;
  price?: number;
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const authenticatedRequest = req as typeof req & AuthenticatedRequest;

    if (!authenticatedRequest.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const items = Array.isArray(authenticatedRequest.body.items)
      ? authenticatedRequest.body.items
      : [];

    if (items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    const hasInvalidItem = items.some(
      (item: OrderItemInput) =>
        !item.foodId ||
        !mongoose.Types.ObjectId.isValid(item.foodId) ||
        typeof item.quantity !== "number" ||
        item.quantity < 1 ||
        !Number.isInteger(item.quantity) ||
        typeof item.price !== "number" ||
        item.price <= 0
    );

    if (hasInvalidItem) {
      return res.status(400).json({ message: "Each order item is incomplete" });
    }

    const order = await OrderModel.create({
      userId: authenticatedRequest.userId,
      items,
    });

    await order.populate("items.foodId", "name image");

    return res.status(201).json({ order });
  } catch (error) {
    console.error("Create order failed", error);
    return res.status(500).json({ message: "Unable to create order right now" });
  }
};
