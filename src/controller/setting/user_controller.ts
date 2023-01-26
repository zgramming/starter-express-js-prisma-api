import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { PrismaClient, UserStatus } from "@prisma/client";

import { generateToken } from "../../utils/token";

const prisma = new PrismaClient();
const saltRounds = 10;

export class UserController {
  public static async getUsers(req: Request, res: Response) {
    const {
      username,
      name,
      app_group_user_id = 0,
      status,
      limit,
      offset,
    }: {
      username?: string;
      name?: string;
      app_group_user_id?: number;
      status?: UserStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const users = await prisma.users.findMany({
      include: {
        app_group_user: true,
      },
      where: {
        ...(username && { username: { contains: username } }),
        ...(name && { name: { contains: name } }),
        ...(status && { status: status }),
        ...(app_group_user_id != 0 && {
          app_group_user_id: +app_group_user_id,
        }),
      },
      // ...(limit !== 0 && { take: +limit }),
      // ...(offset !== 0 && { skip: +offset }),
    });

    return res.status(200).json({ success: true, data: users });
  }

  public static async createUsers(req: Request, res: Response) {
    try {
      const {
        app_group_user_id = 0,
        name = "",
        email = "",
        username = "",
        password = "",
        status = "active",
      }: {
        app_group_user_id?: number;
        name?: string;
        email?: string;
        username?: string;
        password?: string;
        status?: UserStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.users.create({
        data: {
          email: email,
          name: name,
          password: hashSync(password, saltRounds),
          username: username,
          app_group_user_id: +app_group_user_id,
          status: status,
        },
      });

      return res.status(200).json({
        success: true,
        data: result,
        message: "Berhasil membuat user dengan nama " + name,
      });
    } catch (error: any) {
      const status = error.statusCode || error.status || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async updateUsers(req: Request, res: Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const {
        app_group_user_id = 0,
        name = "",
        email = "",
        username = "",
        password = "",
        status = "active",
      }: {
        app_group_user_id?: number;
        name?: string;
        email?: string;
        username?: string;
        password?: string;
        status?: UserStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.users.update({
        where: {
          id: +id,
        },
        data: {
          email: email,
          name: name,
          password: hashSync(password, saltRounds),
          username: username,
          app_group_user_id: +app_group_user_id,
          status: status,
        },
      });

      return res.status(200).json({
        success: true,
        data: result,
        message: "Berhasil mengupdate user dengan nama " + name,
      });
    } catch (error: any) {
      const status = error.statusCode || error.status || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async updateNameUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const user = await prisma.users.findFirstOrThrow({
        where: { id: +id },
      });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const update = await prisma.users.update({
        where: { id: user.id },
        data: {
          ...user,
          name: name,
        },
      });

      return res.json({
        success: true,
        message: "Berhasil mengupdate nama menjadi " + name,
        token: generateToken(update),
        data: update,
      });
    } catch (error: any) {
      const status = error.statusCode || error.status || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async deleteUsers(req: Request, res: Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;

      const user = await prisma.users.findFirstOrThrow({ where: { id: +id } });

      const result = await prisma.users.delete({
        where: { id: +id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus user",
        data: result,
      });
    } catch (error: any) {
      const status = error.statusCode || error.status || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }
}
