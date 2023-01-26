import express from "express";
import { body } from "express-validator";

import { UserController } from "../../controller/setting/user_controller";

const router = express.Router();

router.get(`/`, UserController.getUsers);
router.post(
  `/`,
  [
    body("app_group_user_id").notEmpty(),
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("username").notEmpty(),
    body("password").notEmpty(),
  ],
  UserController.createUsers
);
router.put(
  `/:id`,
  body("id").notEmpty(),
  body("app_group_user_id").notEmpty(),
  body("name").notEmpty(),
  body("email").notEmpty(),
  body("username").notEmpty(),
  body("password").notEmpty(),
  UserController.updateUsers
);
router.put(
  `/update_name/:id`,
  body("name").isEmpty(),
  UserController.updateNameUsers
);
router.delete(`/:id`, UserController.deleteUsers);

export default router;
