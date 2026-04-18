import express from "express";
import type { ErrorRequestHandler } from "express";
import { connectToDatabase } from "./database/index.js";
import { FoodRouter } from "./routes/food.router.js";
import { CategoryRouter } from "./routes/category.router.js";
import { AuthRouter } from "./routes/auth.router.js";
import cors from "cors";
import { orderRouter } from "./routes/order.router.js";
import { config } from "./config.js";

await connectToDatabase();

const app = express();
const apiRouter = express.Router();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

const healthResponse = {
  status: "ok",
  service: "food-delivery-api",
  endpoints: ["/foods", "/categories", "/auth", "/orders"],
};

apiRouter.use("/foods", FoodRouter);
apiRouter.use("/categories", CategoryRouter);
apiRouter.use("/auth", AuthRouter);
apiRouter.use("/orders", orderRouter);

app.get("/", (_req, res) => {
  res.status(200).json(healthResponse);
});

app.get("/health", (_req, res) => {
  res.status(200).json(healthResponse);
});

app.use(apiRouter);
app.use("/_/backend", apiRouter);
app.use("/_backend", apiRouter);

const payloadErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error?.type === "entity.too.large") {
    return res.status(413).json({
      message: "Image is too large. Please upload an image smaller than 10MB.",
    });
  }

  next(error);
};

app.use(payloadErrorHandler);

app.listen(config.port, () => {
  console.log(`Food delivery API listening on port ${config.port}`);
});
