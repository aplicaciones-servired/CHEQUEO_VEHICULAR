import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function isAuthEnabled() {
  return process.env.AUTH_ENABLED === "true";
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!isAuthEnabled()) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: "Token de autenticacion requerido",
        code: "AUTH_REQUIRED",
      },
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      success: false,
      error: {
        message: "JWT_SECRET no configurado",
        code: "AUTH_MISCONFIGURED",
      },
    });
  }

  try {
    jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      error: {
        message: "Token invalido o expirado",
        code: "INVALID_TOKEN",
      },
    });
  }
};
