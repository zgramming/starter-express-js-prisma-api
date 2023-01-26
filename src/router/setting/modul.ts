import express from "express";

import { check } from "express-validator";
import { SettingModulController } from "../../controller/setting/modul_controller";

const router = express.Router();

router.get(`/`, SettingModulController.getModul);
router.post(
  `/`,
  [
    check("code").notEmpty().withMessage("Code required"),
    check("name").notEmpty().withMessage("Name required"),
    check("pattern").notEmpty().withMessage("Pattern required"),
  ],
  SettingModulController.createModul
);
router.put(
  `/:id`,
  [
    check("code").notEmpty().withMessage("Code required"),
    check("name").notEmpty().withMessage("Name required"),
    check("pattern").notEmpty().withMessage("Pattern required"),
  ],
  SettingModulController.updateModul
);
router.delete(`/:id`, SettingModulController.deleteModul);

export default router;
