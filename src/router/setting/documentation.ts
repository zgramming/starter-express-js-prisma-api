import express from "express";
import { check } from "express-validator";

import { SettingDocumentationController } from "../../controller/setting/documentation_controller";

const router = express.Router();

router.get(`/`, SettingDocumentationController.get);
router.post(
  `/`,
  [
    check("code", "Code required").not().isEmpty(),
    check("name", "Name required").not().isEmpty(),
    check("job_id", "Job required").not().isEmpty(),
  ],
  SettingDocumentationController.create
);
router.put(
  `/:id`,
  [
    check("code", "Code required").not().isEmpty(),
    check("name", "Name required").not().isEmpty(),
    check("job_id", "Job required").not().isEmpty(),
  ],
  SettingDocumentationController.update
);
router.delete(`/:id`, SettingDocumentationController.delete);

export default router;
