import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserOrders } from "../controllers/order/get-user-orders.js";
import { createOrder } from "../controllers/order/create-order.js";

const orderRouter = Router();

orderRouter
  .get("/", authMiddleware, getUserOrders)
  .post("/", authMiddleware, createOrder);

export { orderRouter };
