import express from "express";
import { validationResult } from "express-validator";

import { CommonStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SettingMenuController {
  public static async getMenu(req: express.Request, res: express.Response) {
    const {
      app_modul_id = 0,
      name = "",
      code = "",
      status = "active",
      limit,
      offset,
    }: {
      app_modul_id?: number;
      name?: string;
      code?: string;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const result = await prisma.appMenu.findMany({
      where: {
        ...(app_modul_id && { app_modul_id: +app_modul_id }),
        ...(name && { name: { contains: name } }),
        ...(code && { code: { contains: code } }),
        ...(status && { status: { equals: status } }),
      },
      ...(limit && limit != 0 && { take: +limit }),
      ...(offset && offset != 0 && { skip: +offset }),
      include: {
        menu_parent: true,
        app_modul: true,
        access_menu: true,
        menu_childrens: true,
      },
      orderBy: [
        {
          app_modul_id: "asc",
        },
        { order: "asc" },
      ],
    });
    return res.json({ success: true, data: result });
  }

  public static async createMenu(req: express.Request, res: express.Response) {
    try {
      const {
        app_modul_id = 0,
        app_menu_id_parent,
        code = "",
        name = "",
        route = "",
        order = 0,
        icon,
        status = "active",
      }: {
        app_modul_id?: number;
        app_menu_id_parent?: number;
        code?: string;
        name?: string;
        route?: string;
        order?: number;
        icon?: string;
        status?: CommonStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.appMenu.create({
        data: {
          app_modul_id: +app_modul_id,
          app_menu_id_parent: app_menu_id_parent && +app_menu_id_parent,
          code: code,
          name: name,
          route: route,
          icon: icon,
          order: +order,
          status: status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat menu dengan nama " + name,
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async updateMenu(req: express.Request, res: express.Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const {
        app_modul_id = 0,
        app_menu_id_parent = 0,
        code = "",
        name = "",
        route = "",
        order = 0,
        icon,
        status = "active",
      }: {
        app_modul_id?: number;
        app_menu_id_parent?: number;
        code?: string;
        name?: string;
        route?: string;
        order?: number;
        icon?: string;
        status?: CommonStatus;
      } = req.body;

      const menu = await prisma.appMenu.findFirstOrThrow({
        where: { id: +id },
      });

      const result = await prisma.appMenu.update({
        where: { id: menu.id },
        data: {
          app_modul_id: +app_modul_id,
          ...(app_menu_id_parent && {
            app_menu_id_parent: app_menu_id_parent,
          }),
          code: code,
          name: name,
          route: route,
          icon: icon,
          order: +order,
          status: status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil mengupdate menu dengan nama " + name,
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async deleteMenu(req: express.Request, res: express.Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const menu = await prisma.appMenu.findFirstOrThrow({
        where: { id: +id },
      });
      const result = await prisma.appMenu.delete({
        where: { id: menu.id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus Menu",
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
