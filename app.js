import express from "express";
import { router as uploadRoutes } from "./routes/uploadRoutes.js";

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
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Welcome!");
});
export { app };
