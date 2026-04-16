import { getChequeoById, getChequeos } from "../controllers/cheuqueo.controller";
import { Router } from "express";
import { createSeguimientoLogin } from "../controllers/seguimientoLogin.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const Chequeo_Routes = Router();

Chequeo_Routes.get("/Vehicular/:zona", requireAuth, getChequeos);
Chequeo_Routes.get("/Vehicular/:zona/:id", requireAuth, getChequeoById);
Chequeo_Routes.post("/SeguimientoLogin", requireAuth, createSeguimientoLogin);
Chequeo_Routes.post("/Seguimiento/Login", requireAuth, createSeguimientoLogin);