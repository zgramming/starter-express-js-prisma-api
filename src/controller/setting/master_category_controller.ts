import express from "express";
import { validationResult } from "express-validator";

import { CommonStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class SettingMasterCategoryController {
  public static async get(req: express.Request, res: express.Response) {
    const {
      code = "",
      name = "",
      status,
      limit,
      offset,
    }: {
      code?: string;
      name?: string;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const result = await prisma.masterCategory.findMany({
      include: {
        master_datas: true,
        master_category_children: true,
        master_category_parent: true,
      },
      where: {
        ...(code && { code: { contains: code } }),
        ...(name && { name: { contains: name } }),
        ...(status && { status: status }),
      },
      // ...(limit !== 0 && { take: +limit }),
      // ...(offset !== 0 && { skip: +offset }),
    });

    return res.json({ success: true, data: result });
  }

  public static async create(req: express.Request, res: express.Response) {
    try {
      const {
        master_category_id = 0,
        code = "",
        name = "",
        description = "",
        status = "active",
      }: {
        master_category_id?: number;
        code?: string;
        name?: string;
        description?: string;
        status?: CommonStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.masterCategory.create({
        data: {
          description: description,
          ...(master_category_id != 0 && {
            master_category_id: +master_category_id,
          }),
          status: status,
          code: code,
          name: name,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Master Category dengan nama " + name,
      });
    } catch (error: any) {
      return res.status(error.statusCode || error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async update(req: express.Request, res: express.Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const {
        master_category_id = 0,
        code = "",
        name = "",
        description = "",
        status = "active",
      }: {
        master_category_id?: number;
        code?: string;
        name?: string;
        description?: string;
        status?: CommonStatus;
      } = req.body;

      const category = await prisma.masterCategory.findFirstOrThrow({
        where: { id: +id },
      });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.masterCategory.update({
        where: {
          id: category.id,
        },
        data: {
          code: code,
          name: name,
          description: description,
          ...(master_category_id != 0 && {
            master_category_id: +master_category_id,
          }),
          status: status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Master Category dengan nama " + name,
      });
    } catch (error: any) {
      return res.status(error.statusCode || error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public static async delete(req: express.Request, res: express.Response) {
    try {
      const { id = 0 }: { id?: number } = req.params;
      const category = await prisma.masterCategory.findFirstOrThrow({
        where: { id: +id },
      });

      const result = await prisma.masterCategory.delete({
        where: { id: +id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus Master Category",
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
