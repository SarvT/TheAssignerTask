import express from "express";
import { router as transactionRoutes } from "./routes/transaction.route.js";
import { router as userRoutes } from "./routes/user.route.js";
import connectDB from "./db/db.js";

connectDB();

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use('/api', transactionRoutes);
app.use('/api', userRoutes); // Use user routes

app.get("/", (req, res) => {
  res.send("Welcome!");
});
export { app };
