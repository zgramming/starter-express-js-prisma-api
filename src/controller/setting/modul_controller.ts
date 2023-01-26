import express from "express";
import { validationResult } from "express-validator";

import { CommonStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SettingModulController {
  public static async getModul(req: express.Request, res: express.Response) {
    const {
      code = "",
      name = "",
      pattern = "",
      status,
      limit,
      offset,
    }: {
      code?: string;
      name?: string;
      pattern?: string;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const result = await prisma.appModul.findMany({
      where: {
        ...(code && { code: { contains: code } }),
        ...(name && { name: { contains: name } }),
        ...(pattern && { pattern: pattern }),
        ...(status && { status: status }),
      },
      include: {
        menus: true,
        access_menu: true,
        access_modul: true,
      },
      // ...(limit !== 0 && { take: +limit }),
      // ...(offset !== 0 && { skip: +offset }),
    });

    return res.json({ success: true, data: result });
  }

  public static async createModul(req: express.Request, res: express.Response) {
    try {
      const {
        code = "",
        name = "",
        pattern = "",
        icon = "",
        order = 0,
        status = "active",
      }: {
        code?: string;
        name?: string;
        pattern?: string;
        icon?: string;
        order?: number;
        status?: CommonStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.appModul.create({
        data: {
          code,
          name,
          pattern,
          icon,
          order: +order,
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat modul dengan nama " + name,
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async updateModul(req: express.Request, res: express.Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const {
        code = "",
        name = "",
        pattern = "",
        icon = "",
        order = 0,
        status = "active",
      }: {
        code?: string;
        name?: string;
        pattern?: string;
        icon?: string;
        order?: number;
        status?: CommonStatus;
      } = req.body;

      const modul = await prisma.appModul.findFirstOrThrow({
        where: { id: +id },
      });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.appModul.update({
        where: { id: modul.id },
        data: {
          code,
          name,
          pattern,
          icon,
          order: +order,
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil mengupdate modul dengan nama " + name,
      });
    } catch (error: any) {
      res.status(error.statusCode || error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async deleteModul(req: express.Request, res: express.Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const modul = await prisma.appModul.findFirstOrThrow({
        where: { id: +id },
      });

      const result = await prisma.appModul.delete({
        where: { id: modul.id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus modul",
        data: result,
      });
    } catch (error: any) {
      return res.status(error.statusCode || error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
