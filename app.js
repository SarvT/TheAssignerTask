import express from "express";
import { router as itemsRoutes } from "./routes/itemRoutes.js";

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
app.use("/api", itemsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome!");
});
export { app };
