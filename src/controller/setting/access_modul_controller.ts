import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SettingAccessModulController {
  public static async get(req: express.Request, res: express.Response) {
    const {
      app_group_user_id = 0,
    }: { app_group_user_id?: number; app_modul_id?: number } = req.query;

    const result = await prisma.appAccessModul.findMany({
      include: {
        app_group_user: true,
        app_modul: true,
      },
      where: {
        ...(app_group_user_id && { app_group_user_id: +app_group_user_id }),
      },
    });
    return res.json({ success: true, data: result });
  }

  public static async getByUserGroup(
    req: express.Request,
    res: express.Response
  ) {
    const { app_group_user_id } = req.params;
    const result = await prisma.appAccessModul.findMany({
      where: {
        app_group_user_id: +(app_group_user_id ?? "0"),
      },
      include: {
        app_group_user: true,
        app_modul: {
          include: { menus: true, access_menu: true, access_modul: true },
        },
      },
      orderBy: {
        app_modul: {
          order: "asc",
        },
      },
    });

    return res.json({
      data: result,
    });
  }

  public static async create(req: express.Request, res: express.Response) {
    try {
      const {
        app_group_user_id = 0,
        access_modul = [],
      }: {
        app_group_user_id?: number;
        access_modul: Array<{
          app_modul_id?: number;
        }>;
      } = req.body;

      const removeAll = await prisma.appAccessModul.deleteMany({
        where: {
          app_group_user_id: +app_group_user_id,
        },
      });

      const result = await prisma.appAccessModul.createMany({
        data: access_modul.map((val) => {
          return {
            app_group_user_id: +app_group_user_id,
            app_modul_id: +val,
          };
        }),
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat access modul",
      });
    } catch (error: any) {
      return res.status(error.statusCode || error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
