import express from "express";

import { SettingAccessModulController } from "../../controller/setting/access_modul_controller";

const router = express.Router();

router.get(`/`, SettingAccessModulController.get);
router.get(
  `/by_user_group/:app_group_user_id`,
  SettingAccessModulController.getByUserGroup
);
router.post(`/`, SettingAccessModulController.create);

export default router;
