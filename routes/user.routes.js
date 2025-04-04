import { Router } from "express";

const userRouter = Router();

// GET /users -> get all users
// GET /users/:id -> get user by id // 123

userRouter.get("/", (req, res) => res.send({ title: "GET all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "GET all users" }));
userRouter.POST("/", (req, res) => res.send({ title: "CREATE new user" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));
userRouter.put("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
