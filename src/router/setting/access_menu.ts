import express from "express";

import { SettingAccessMenuController } from "../../controller/setting/access_menu_controller";

const router = express.Router();

router.get(`/setting/access_menu`, SettingAccessMenuController.get);
router.get(
  `/setting/access_menu/by_user_group/:app_group_user_id`,
  SettingAccessMenuController.getByUserGroup
);
router.post(`/setting/access_menu`, SettingAccessMenuController.create);
export default router;
