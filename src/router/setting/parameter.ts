import express from "express";
import { check } from "express-validator";

import { SettingParameterController } from "../../controller/setting/parameter_controller";

const router = express.Router();

router.get(`/`, SettingParameterController.get);
router.post(
  `/`,
  [
    check("code", "Code required").not().isEmpty(),
    check("name", "Name required").not().isEmpty(),
    check("value", "Value required").not().isEmpty(),
  ],
  SettingParameterController.create
);
router.put(
  `/:id`,
  [
    check("code", "Code required").not().isEmpty(),
    check("name", "Name required").not().isEmpty(),
    check("value", "Value required").not().isEmpty(),
  ],
  SettingParameterController.update
);
router.delete(`/:id`, SettingParameterController.delete);

export default router;
