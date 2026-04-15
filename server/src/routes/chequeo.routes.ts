import { getChequeoById, getChequeos } from "../controllers/cheuqueo.controller";
import { Router } from "express";
import { createSeguimientoLogin } from "../controllers/seguimientoLogin.controller";

export const Chequeo_Routes = Router();

Chequeo_Routes.get("/Vehicular/:zona", getChequeos);
Chequeo_Routes.get("/Vehicular/:zona/:id", getChequeoById);
Chequeo_Routes.post("/SeguimientoLogin", createSeguimientoLogin);