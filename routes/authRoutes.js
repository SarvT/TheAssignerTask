import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

export { router };
