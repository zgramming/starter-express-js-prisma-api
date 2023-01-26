import express from "express";
import { check } from "express-validator";

import { SettingMasterCategoryController } from "../../controller/setting/master_category_controller";

const router = express.Router();

router.get(`/`, SettingMasterCategoryController.get);
router.post(
  `/`,
  [
    check("code").withMessage("Code required"),
    check("name").withMessage("Name required"),
  ],
  SettingMasterCategoryController.create
);
router.put(
  `/:id`,
  [
    check("code").withMessage("Code required"),
    check("name").withMessage("Name required"),
  ],
  SettingMasterCategoryController.update
);
router.delete(`/:id`, SettingMasterCategoryController.delete);

export default router;
