import express from "express";
import { connectToDatabase } from "./database/index.js";
import { FoodRouter } from "./routes/food.router.js";
import { CategoryRouter } from "./routes/category.router.js";
import { AuthRouter } from "./routes/auth.router.js";
import cors from "cors";
import { orderRouter } from "./routes/order.router.js";
import { config } from "./config.js";

await connectToDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/orders", orderRouter);

app.listen(config.port, () => {
  console.log(`Food delivery API listening on port ${config.port}`);
});
