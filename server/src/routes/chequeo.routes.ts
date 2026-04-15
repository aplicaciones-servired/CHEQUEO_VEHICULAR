import { getChequeoById, getChequeos } from "../controllers/cheuqueo.controller";
import { Router } from "express";

export const Chequeo_Routes = Router();

Chequeo_Routes.get("/Vehicular/:zona", getChequeos);
Chequeo_Routes.get("/Vehicular/:zona/:id", getChequeoById);