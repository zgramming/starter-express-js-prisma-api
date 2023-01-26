import express from "express";
import settingUserRouter from "./src/router/setting/user";
import settingUserGroupRouter from "./src/router/setting/user_group";
import settingModulRouter from "./src/router/setting/modul";
import settingMenuRouter from "./src/router/setting/menu";
// const form = formidable({ multiples: true });
const router = express.Router();

router.post("/login", async (req, res) => {
  return res.json({ success: true, data: "Login" });
});
router.post("/logout", async (req, res) => {});
router.post("/register", async (req, res) => {});

router.use("/setting/user", settingUserRouter);
router.use("/setting/user_group", settingUserGroupRouter);
router.use("/setting/modul", settingModulRouter);
router.use("/setting/menu", settingMenuRouter);

export default router;
