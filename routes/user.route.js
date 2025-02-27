import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/users", getAllUsers);

export { router };
