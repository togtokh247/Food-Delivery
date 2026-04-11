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
const apiRouter = express.Router();

app.use(express.json());
app.use(cors());

apiRouter.use("/foods", FoodRouter);
apiRouter.use("/categories", CategoryRouter);
apiRouter.use("/auth", AuthRouter);
apiRouter.use("/orders", orderRouter);

app.use(apiRouter);
app.use("/_/backend", apiRouter);
app.use("/_backend", apiRouter);

app.listen(config.port, () => {
  console.log(`Food delivery API listening on port ${config.port}`);
});
