import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscrption.routes.js";
import connectToDatabase from "./database/mongodb.js";
import erroMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);

// api/v1/auth/sign-up
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscrptions", subscriptionRouter);

app.use(erroMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on: http://localhost:${PORT}`
  );

  await connectToDatabase();
});

export default app;
