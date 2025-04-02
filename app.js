import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(port, () => {
  console.log("Subscription Tracker API is running on: http://localhost:3000");
});

export default app;
