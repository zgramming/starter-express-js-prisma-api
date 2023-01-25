import express from "express";
import settingUserRouter from "./src/router/setting/user_router";

// const form = formidable({ multiples: true });
const router = express.Router();

router.post("/login", async (req, res) => {
  return res.json({ success: true, data: "Login" });
});
router.post("/logout", async (req, res) => {});
router.post("/register", async (req, res) => {});

router.use("/setting/user", settingUserRouter);

export default router;
