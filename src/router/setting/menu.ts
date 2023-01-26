import express from "express";
import { check } from "express-validator";

import { SettingMenuController } from "../../controller/setting/menu_controller";

const router = express.Router();

router.get(`/`, SettingMenuController.getMenu);
router.post(
  `/`,
  [
    check("app_modul_id").notEmpty().withMessage("Modul required"),
    check("code").notEmpty().withMessage("Code required"),
    check("name").notEmpty().withMessage("Name required"),
    check("route").notEmpty().withMessage("Route required"),
  ],
  SettingMenuController.createMenu
);
router.put(
  `/:id`,
  [
    check("app_modul_id").notEmpty().withMessage("Modul required"),
    check("code").notEmpty().withMessage("Code required"),
    check("name").notEmpty().withMessage("Name required"),
    check("route").notEmpty().withMessage("Route required"),
  ],
  SettingMenuController.updateMenu
);
router.delete(`/:id`, SettingMenuController.deleteMenu);

export default router;
