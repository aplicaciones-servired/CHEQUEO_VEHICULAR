import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

export const notFoundHandler = (_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: {
      message: "Ruta no encontrada",
      code: "NOT_FOUND",
    },
  });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: "APP_ERROR",
      },
    });
  }

  console.error("Unhandled error:", err);

  return res.status(500).json({
    success: false,
    error: {
      message: "Error interno del servidor",
      code: "INTERNAL_ERROR",
    },
  });
};
