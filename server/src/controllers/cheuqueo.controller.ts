import { Op } from "sequelize";
import { Chequeo_vehiclar, initEmpresa } from "../models/chequeo.models";

export const getChequeos = async (req: any, res: any) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const offset = (page - 1) * pageSize;
  const zona = (req.query.zona as string) || (req.params.zona as string);
  const fecha = req.query.fecha as string;
  const fechaInicio = req.query.fechaInicio as string;
  const fechaFin = req.query.fechaFin as string;

  if (!zona) {
    return res.status(400).json({ message: "El parametro zona es requerido" });
  }


  initEmpresa(zona);

  const whereChequeo: any = {};
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
        data: chequeos,
        message: "Chequeos obtenidos correctamente",
        count,
        page,
        pageSize,
      });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los chequeos" });
  }
};

export const getChequeoById = async (req: any, res: any) => {
  const { zona, id } = req.params;
  initEmpresa(zona);

  try {
    const chequeo = await Chequeo_vehiclar.findOne({
      where: { id },
    });

    if (!chequeo) {
      return res.status(404).json({ message: "Chequeo no encontrado" });
    }

    return res.status(200).json({
      data: chequeo, // objeto
      message: "Chequeo obtenido correctamente",
    });
  } catch {
    return res.status(500).json({ message: "Error al obtener el chequeo" });
  }
};
