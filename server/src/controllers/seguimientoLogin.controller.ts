import { Segumineto_Login } from "../models/seguimiento.model";

export const createSeguimientoLogin = async (req: any, res: any) => {
  try {
    const { nombre, cedula, empresa } = req.body;
    const fecha = new Date().toISOString().slice(0, 10);
    await Segumineto_Login.create({
      fecha,
      nombre,
      cedula,
      empresa,
    });
    console.log(`[Seguimiento Login] fecha=${fecha} nombre=${nombre} cedula=${cedula} empresa=${empresa}`);
    res
      .status(201)
      .json({ message: "Seguimiento de login creado" });
  } catch (error) {
    console.error("Error al crear seguimiento de login:", error);
    res
      .status(500)
      .json({
        message: "Error al crear seguimiento de login",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
  }
};
