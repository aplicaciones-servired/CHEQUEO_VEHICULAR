import cors from "cors";
import express from "express";
import log from "morgan";
import { Chequeo_Routes } from "./routes/chequeo.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";


export const app = express();

app.use(cors());
app.use(log("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Servicio activo",
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
});

app.use(Chequeo_Routes);
app.use(notFoundHandler);
app.use(errorHandler);
