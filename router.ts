import express from "express";
import formidable from "formidable";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const form = formidable({ multiples: true });
const router = express.Router();

// Auth

router.post("/login", async (req, res) => {
  return res.status(200).json({ message: "Login Success" });
});
router.post("/register", async (req, res) => {});
router.post("/logout", async (req, res) => {});

export default router;
