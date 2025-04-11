import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET /users -> get all users
// GET /users/:id -> get user by id
userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);

// POST /users -> create a new user
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));

// PUT /users/:id -> update user
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));

// DELETE /users/:id -> delete user
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default userRouter;
