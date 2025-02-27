import express from "express";
import { router as menuRouter } from "./routes/menu.route.js";

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
app.use("/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Menu!");
});
export { app };
