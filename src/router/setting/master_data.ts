import express from "express";
import { check } from "express-validator";

import { SettingMasterDataController } from "../../controller/setting/master_data_controller";

const router = express.Router();
router.get(`/`, SettingMasterDataController.get);
router.get(`/by-code/:code`, SettingMasterDataController.getByCode);
router.get(
  `/by-category-code/:category_code`,
  SettingMasterDataController.getByCategoryCodeCategory
);
router.post(
  `/`,
  [
    check("master_category_code")
      .notEmpty()
      .withMessage("Kode Kategori harus diisi"),
    check("code").notEmpty().withMessage("Kode harus diisi"),
    check("name").notEmpty().withMessage("Nama harus diisi"),
  ],
  SettingMasterDataController.create
);
router.put(
  `/:id`,
  [
    check("master_category_code")
      .notEmpty()
      .withMessage("Kode Kategori harus diisi"),
    check("code").notEmpty().withMessage("Kode harus diisi"),
    check("name").notEmpty().withMessage("Nama harus diisi"),
  ],
  SettingMasterDataController.update
);
router.delete(`/:id`, SettingMasterDataController.delete);

export default router;
