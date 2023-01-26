import express from "express";
import { validationResult } from "express-validator";

import { CommonStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SettingUserGroupController {
  public static async getUserGroup(
    req: express.Request,
    res: express.Response
  ) {
    const {
      name,
      status,
      code,
      limit,
      offset,
    }: {
      code?: string;
      name?: string;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const userGroup = await prisma.appGroupUser.findMany({
      where: {
        ...(name && { name: name }),
        ...(status && { status: status }),
        ...(code && { code: code }),
      },
      include: {
        user: true,
        access_menu: true,
        access_modul: true,
      },
      // ...(limit !== 0 && { take: +limit }),
      // ...(offset !== 0 && { skip: 10 }),
    });

    return res.json({ success: true, data: userGroup });
  }

  public static async createUserGroup(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const {
        code,
        name,
        status = "active",
      }: { code?: string; name?: string; status?: CommonStatus } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.appGroupUser.create({
        data: {
          code: code ?? "",
          name: name ?? "",
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat user group",
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async updateUserGroup(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const {
        code,
        name,
        status = "active",
      }: {
        id: string;
        code?: string;
        name?: string;
        status?: CommonStatus;
      } = req.body;

      const userGroup = await prisma.appGroupUser.findFirstOrThrow({
        where: { id: +id ?? 0 },
      });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.appGroupUser.update({
        where: {
          id: userGroup.id,
        },
        data: {
          code: code,
          name: name,
          status,
        },
      });

      return res.json({
        success: true,
        message: "Berhasil mengupdate nama menjadi " + name,
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async deleteUserGroup(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const userGroup = await prisma.appGroupUser.findFirstOrThrow({
        where: { id: +id },
      });

      const result = await prisma.appGroupUser.delete({
        where: {
          id: userGroup.id,
        },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus user group",
        data: result,
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
}
