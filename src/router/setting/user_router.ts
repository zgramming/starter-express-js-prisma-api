import express from "express";
import { body } from "express-validator";

import { UserController } from "../../controller/setting/user_controller";

const userRouter = express.Router();

userRouter.get(`/`, UserController.getUsers);
userRouter.post(
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
userRouter.put(
  `:id`,
  body("id").notEmpty(),
  body("app_group_user_id").notEmpty(),
  body("name").notEmpty(),
  body("email").notEmpty(),
  body("username").notEmpty(),
  body("password").notEmpty(),
  UserController.updateUsers
);
userRouter.put(
  `/update_name/:id`,
  body("name").isEmpty(),
  UserController.updateNameUsers
);
userRouter.delete(`:id`, UserController.deleteUsers);

export default userRouter;
