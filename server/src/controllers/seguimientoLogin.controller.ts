import { Segumineto_Login } from "../models/seguimiento.model";
import type { Request, Response } from "express";

function normalizeEmpresa(value: string): string | null {
  const normalized = value.trim().toLowerCase();

  if (normalized.includes("multired")) {
    return "Multired";
  }

  if (normalized.includes("servired")) {
    return "Servired";
  }

  return null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeCedula(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

function validationError(res: Response, field: string, message: string) {
  return res.status(400).json({
    success: false,
    error: {
      code: "VALIDATION_ERROR",
      field,
      message,
    },
  });
}

export const createSeguimientoLogin = async (req: Request, res: Response) => {
  try {
    const { nombre, cedula, empresa } = req.body;

    console.log("[Seguimiento Login] payload recibido:", {
      nombre,
      cedula,
      empresa,
    });

    if (!isNonEmptyString(nombre)) {
      return validationError(res, "nombre", "nombre es obligatorio");
    }

    const normalizedCedula = normalizeCedula(cedula);

    if (!normalizedCedula) {
      return validationError(res, "cedula", "cedula es obligatoria");
    }

    if (!isNonEmptyString(empresa)) {
      return validationError(res, "empresa", "empresa es obligatoria");
    }

    const normalizedEmpresa = normalizeEmpresa(empresa);

    if (!normalizedEmpresa) {
      return validationError(res, "empresa", "empresa invalida. Valores permitidos: Multired, Servired");
    }

    const fecha = new Date().toISOString().slice(0, 10);
    await Segumineto_Login.create({
      fecha,
      nombre: nombre.trim(),
      cedula: normalizedCedula,
      empresa: normalizedEmpresa,
    });
    console.log(`[Seguimiento Login] fecha=${fecha} nombre=${nombre} cedula=${normalizedCedula} empresa=${normalizedEmpresa}`);
    res
      .status(201)
      .json({
        success: true,
        message: "Seguimiento de login creado",
      });
  } catch (error) {
    console.error("Error al crear seguimiento de login:", error);
    res
      .status(500)
      .json({
        success: false,
        error: {
          code: "CREATE_TRACKING_ERROR",
          message: "Error al crear seguimiento de login",
          detail: error instanceof Error ? error.message : "Error desconocido",
        },
      });
  }
};
