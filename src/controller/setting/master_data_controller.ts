import express from "express";
import { validationResult } from "express-validator";

import { CommonStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SettingMasterDataController {
  public static async get(req: express.Request, res: express.Response) {
    const {
      master_category_id,
      master_category_code,
      code,
      name,
      status,
      limit,
      offset,
    }: {
      master_category_id?: number;
      master_category_code?: string;
      code?: string;
      name?: string;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const result = await prisma.masterData.findMany({
      where: {
        ...(master_category_code && {
          master_category_code: master_category_code,
        }),
        ...(master_category_id && { master_category_id: +master_category_id }),
        ...(code && { code: code }),
        ...(name && { name: name }),
        ...(status && { status: status }),
      },
      include: {
        master_category: true,
        master_data_children: true,
        master_data_parent: true,
      },
      orderBy: {
        order: "asc",
      },
      // ...(limit !== 0 && { take: +limit }),
      // ...(offset !== 0 && { skip: +offset }),
    });
    return res.json({ success: true, data: result });
  }
  public static async getByCode(req: express.Request, res: express.Response) {
    const { code } = req.params;
    const result = await prisma.masterData.findUnique({
      where: { code: code },
    });
    return res.json({
      success: true,
      message: "Berhasil mendapatkan master data",
      data: result,
    });
  }

  public static async getByCategoryCodeCategory(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const { category_code } = req.params;
      const result = await prisma.masterData.findMany({
        where: { master_category_code: category_code },
        orderBy: {
          order: "asc",
        },
      });

      return res.json({
        success: true,
        data: result,
      });
    } catch (e: any) {
      const message = e?.message ?? "Unknown Error Message";
      return res.status(500).json({
        success: false,
        message: message,
      });
    }
  }

  public static async create(req: express.Request, res: express.Response) {
    try {
      const {
        master_data_id,
        master_category_code = "",
        code = "",
        name = "",
        description = "",
        order = 1,
        status = "active",
        parameter1_key,
        parameter1_value,
        parameter2_key,
        parameter2_value,
        parameter3_key,
        parameter3_value,
      }: {
        master_data_id?: number;
        master_category_code?: string;
        code?: string;
        name?: string;
        description?: string;
        order?: number;
        status?: CommonStatus;
        parameter1_key?: string;
        parameter1_value?: string;
        parameter2_key?: string;
        parameter2_value?: string;
        parameter3_key?: string;
        parameter3_value?: string;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const masterCategory = await prisma.masterCategory.findFirstOrThrow({
        where: { code: master_category_code },
      });

      const result = await prisma.masterData.create({
        data: {
          master_data_id: master_data_id && +master_data_id,
          master_category_id: +masterCategory!.id,
          master_category_code: masterCategory!.code,
          code,
          name,
          description,
          order,
          status: status,
          parameter1_key,
          parameter1_value,
          parameter2_key,
          parameter2_value,
          parameter3_key,
          parameter3_value,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Master Data dengan nama " + name,
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
        master_data_id,
        code = "",
        name = "",
        description = "",
        order = 1,
        status = "active",
        parameter1_key,
        parameter1_value,
        parameter2_key,
        parameter2_value,
        parameter3_key,
        parameter3_value,
      }: {
        master_data_id?: number;
        master_category_id?: number;
        master_category_code?: string;
        code?: string;
        name?: string;
        description?: string;
        order?: number;
        status?: CommonStatus;
        parameter1_key?: string;
        parameter1_value?: string;
        parameter2_key?: string;
        parameter2_value?: string;
        parameter3_key?: string;
        parameter3_value?: string;
      } = req.body;

      const masterData = await prisma.masterData.findFirstOrThrow({
        where: { id: +id },
      });

      const result = await prisma.masterData.update({
        where: {
          id: masterData.id,
        },
        data: {
          master_data_id: master_data_id && +master_data_id,
          code,
          name,
          description,
          order,
          status: status,
          parameter1_key,
          parameter1_value,
          parameter2_key,
          parameter2_value,
          parameter3_key,
          parameter3_value,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Master Data dengan nama " + name,
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
      const masterData = await prisma.masterData.findFirstOrThrow({
        where: { id: +id },
      });

      const result = await prisma.masterData.delete({
        where: { id: masterData.id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus Master Data",
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
