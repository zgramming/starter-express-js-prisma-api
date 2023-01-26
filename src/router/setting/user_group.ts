import express from "express";
import { check } from "express-validator";

import { SettingUserGroupController } from "../../controller/setting/user_group_controller";

const router = express.Router();

router.get(`/`, SettingUserGroupController.getUserGroup);
router.post(
  `/`,
  [check("code").notEmpty(), check("name").notEmpty()],
  SettingUserGroupController.createUserGroup
);
router.put(
  `/:id`,
  [check("code").notEmpty(), check("name").notEmpty()],
  SettingUserGroupController.updateUserGroup
);
router.delete(`/:id`, SettingUserGroupController.deleteUserGroup);

export default router;
