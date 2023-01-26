import { CommonStatus, PrismaClient } from "@prisma/client";
import express from "express";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();

export class SettingDocumentationController {
  public static async get(req: express.Request, res: express.Response) {
    const {
      code = "",
      name = "",
      job_id,
      status,
      limit,
      offset,
    }: {
      code?: string;
      name?: string;
      job_id?: number;
      status?: CommonStatus;
      limit?: number;
      offset?: number;
    } = req.query;

    const result = await prisma.documentation.findMany({
      where: {
        ...(code && { code: { contains: code } }),
        ...(name && { name: { contains: name } }),
        ...(job_id && { job_id: job_id }),
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
        job_id = 0,
        birth_date = "",
        money = 0,
        hobbies = [],
        description,
        status = "active",
      }: {
        code?: string;
        name?: string;
        job_id?: number;
        birth_date?: string;
        money?: number;
        hobbies?: string[];
        description?: string;
        status?: CommonStatus;
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.documentation.create({
        data: {
          name: name,
          code: code,
          job_id: +job_id,
          birth_date,
          money: +money,
          hobbies: hobbies,
          description,
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Dokumentasi dengan nama " + name,
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
        job_id = 0,
        birth_date = "",
        money = 0,
        hobbies = [],
        description,
        status = "active",
      }: {
        code?: string;
        name?: string;
        job_id?: number;
        birth_date?: string;
        money?: number;
        hobbies?: string[];
        description?: string;
        status?: CommonStatus;
      } = req.body;

      const errors = validationResult(req);

      const documentation = await prisma.documentation.findUniqueOrThrow({
        where: { id: +id },
      });

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await prisma.documentation.update({
        where: { id: documentation.id },
        data: {
          name: name,
          code: code,
          job_id: +job_id,
          birth_date,
          money: +money,
          hobbies: hobbies,
          description,
          status,
        },
      });

      return res.json({
        success: true,
        data: result,
        message: "Berhasil membuat Dokumentasi dengan nama " + name,
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
      const documentation = await prisma.documentation.findUniqueOrThrow({
        where: { id: +id },
      });
      const result = await prisma.documentation.delete({
        where: { id: documentation.id },
      });

      return res.json({
        success: true,
        message: "Berhasil menghapus Dokumentasi",
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
