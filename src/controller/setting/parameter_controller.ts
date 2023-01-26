import express from "express";
import { validationResult } from "express-validator";

import { CommonStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class SettingParameterController {
  public static async get(req: express.Request, res: express.Response) {
    const {
      code = "",
      name = "",
      value = "",
      status,
      limit,
      offset,
    }: {
      code?: string;
      name?: string;
      value?: string;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const result = await prisma.parameter.findMany({
      where: {
        ...(code && { code: { contains: code } }),
        ...(name && { name: { contains: name } }),
        ...(value && { value: { contains: value } }),
        ...(status && { status: status }),
      },
      ...(limit && { take: +limit }),
      ...(offset && { skip: +offset }),
    });

    return res.json({ success: true, data: result });
  }

  public static async create(req: express.Request, res: express.Response) {
    try {
      const {
        code = "",
        name = "",
        value = "",
        status = "active",
      }: {
        code?: string;
        name?: string;
        value?: string;
        status?: CommonStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.parameter.create({
        data: {
          code,
          name,
          value,
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Parameter dengan nama " + name,
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
        code = "",
        name = "",
        value = "",
        status = "active",
      }: {
        code?: string;
        name?: string;
        value?: string;
        status?: CommonStatus;
      } = req.body;

      const parameter = await prisma.parameter.findUniqueOrThrow({
        where: { id: +id },
      });

      const result = await prisma.parameter.update({
        where: { id: parameter.id },
        data: {
          code,
          name,
          value,
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Parameter dengan nama " + name,
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
      const paramter = await prisma.parameter.findUniqueOrThrow({
        where: { id: +id },
      });

      const result = await prisma.parameter.delete({
        where: { id: paramter.id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus Parameter",
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
