import { Op } from "sequelize";
import { Chequeo_vehiclar, initEmpresa } from "../models/chequeo.models";
import type { Request, Response } from "express";

const VALID_ZONAS = new Set(["Multired", "Servired"]);

function parsePositiveInt(value: string | undefined, fallback: number, max: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > max) {
    throw new Error("Numero fuera de rango");
  }
  return parsed;
}

function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function badRequest(res: Response, message: string) {
  return res.status(400).json({
    success: false,
    error: {
      code: "VALIDATION_ERROR",
      message,
    },
  });
}

export const getChequeos = async (req: Request, res: Response) => {
  const zona = (req.query.zona as string) || (req.params.zona as string);
  const fecha = req.query.fecha as string | undefined;
  const fechaInicio = req.query.fechaInicio as string | undefined;
  const fechaFin = req.query.fechaFin as string | undefined;

  let page: number;
  let pageSize: number;

  try {
    page = parsePositiveInt(req.query.page as string | undefined, 1, 100000);
    pageSize = parsePositiveInt(req.query.pageSize as string | undefined, 10, 100);
  } catch {
    return badRequest(res, "page y pageSize deben ser enteros positivos. pageSize maximo: 100");
  }

  const offset = (page - 1) * pageSize;

  if (!zona) {
    return badRequest(res, "El parametro zona es requerido");
  }

  if (!VALID_ZONAS.has(zona)) {
    return badRequest(res, "zona invalida. Valores permitidos: Multired, Servired");
  }

  if (fecha && (fechaInicio || fechaFin)) {
    return badRequest(res, "Usa fecha o fechaInicio/fechaFin, no ambos");
  }

  if ((fechaInicio && !fechaFin) || (!fechaInicio && fechaFin)) {
    return badRequest(res, "fechaInicio y fechaFin deben enviarse juntos");
  }

  if (fecha && !isIsoDate(fecha)) {
    return badRequest(res, "fecha debe tener formato YYYY-MM-DD");
  }

  if (fechaInicio && fechaFin) {
    if (!isIsoDate(fechaInicio) || !isIsoDate(fechaFin)) {
      return badRequest(res, "fechaInicio y fechaFin deben tener formato YYYY-MM-DD");
    }

    if (fechaInicio > fechaFin) {
      return badRequest(res, "fechaInicio no puede ser mayor que fechaFin");
    }
  }

  initEmpresa(zona);

  const whereChequeo: Record<string, unknown> = {};
  if (fecha) {
    whereChequeo.fecha = fecha;
  }
  if (fechaInicio && fechaFin) {
    whereChequeo.fecha = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  }

  try {
    const chequeos = await Chequeo_vehiclar.findAll({
      where: whereChequeo,
      order: [["fecha", "DESC"]],
      limit: pageSize,
      offset: offset,
    });
    const count = await Chequeo_vehiclar.count({ where: whereChequeo });
    res
      .status(200)
      .json({
        success: true,
        data: chequeos,
        message: "Chequeos obtenidos correctamente",
        count,
        page,
        pageSize,
      });
  } catch {
    res.status(500).json({
      success: false,
      error: {
        code: "FETCH_ERROR",
        message: "Error al obtener los chequeos",
      },
    });
  }
};

export const getChequeoById = async (req: Request, res: Response) => {
  const { zona, id } = req.params;

  if (!VALID_ZONAS.has(zona)) {
    return badRequest(res, "zona invalida. Valores permitidos: Multired, Servired");
  }

  if (!/^\d+$/.test(id)) {
    return badRequest(res, "id debe ser numerico");
  }

  initEmpresa(zona);

  try {
    const chequeo = await Chequeo_vehiclar.findOne({
      where: { id },
    });

    if (!chequeo) {
      return res.status(404).json({ message: "Chequeo no encontrado" });
    }

    return res.status(200).json({
      success: true,
      data: chequeo, // objeto
      message: "Chequeo obtenido correctamente",
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: {
        code: "FETCH_BY_ID_ERROR",
        message: "Error al obtener el chequeo",
      },
    });
  }
};
