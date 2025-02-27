import express from "express";

import rateLimiter from "./middlewares/rateLimiter.middleware.js";

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

app.use(rateLimiter);
app.get("/", (req, res) => {
  res.send("Welcome!");
});
export { app };
