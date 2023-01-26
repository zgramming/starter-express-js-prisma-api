import express from "express";

import settingAccessMenuRouter from "./src/router/setting/access_menu";
import settingAccessModulRouter from "./src/router/setting/access_modul";
import settingDocumentationRouter from "./src/router/setting/documentation";
import settingMasterCategoryRouter from "./src/router/setting/master_category";
import settingMasterDataRouter from "./src/router/setting/master_data";
import settingMenuRouter from "./src/router/setting/menu";
import settingModulRouter from "./src/router/setting/modul";
import settingParamaterRouter from "./src/router/setting/parameter";
import settingUserRouter from "./src/router/setting/user";
import settingUserGroupRouter from "./src/router/setting/user_group";

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
router.use("/setting/access_modul", settingAccessModulRouter);
router.use("/setting/access_menu", settingAccessMenuRouter);
router.use("/setting/master_category", settingMasterCategoryRouter);
router.use("/setting/master_data", settingMasterDataRouter);
router.use("/setting/parameter", settingParamaterRouter);
router.use("/setting/documentation", settingDocumentationRouter);

export default router;
