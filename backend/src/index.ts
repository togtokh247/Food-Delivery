import express from "express";
import { connectToDatabase } from "./database/index.js";
import { FoodRouter } from "./routes/food.router.js";

await connectToDatabase();

const app = express();

app.use(express.json());

app.use("/foods", FoodRouter);

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
