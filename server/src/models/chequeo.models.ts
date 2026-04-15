import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import dbChequeo from "../db/db";

class Chequeo_vehiclar extends Model<
  InferAttributes<Chequeo_vehiclar>,
  InferCreationAttributes<Chequeo_vehiclar>
> {
  declare id?: number;
  declare fecha: string;
  declare nombre: string;
  declare cedula: string;
  declare placa: string;
  declare kilometraje: string;
  declare l_baja: string;
  declare l_alta: string;
  declare l_marcha_atras: string;
  declare l_interior: string;
  declare l_freno: string;
  declare estacionarias: string;
  declare viraje_derecho: string;
  declare viraje_izquierdo: string;
  declare observacion1?: string;
  declare radio: string;
  declare pitos: string;
  declare parabrisas: string;
  declare vidrios_laterales: string;
  declare manillas_alza_vidrios: string;
  declare Bateria: string;
  declare espejos_retrovisores: string;
  declare cerraduras: string;
  declare plumillas_limpia_vidrios: string;
  declare dispositivo_velocidad: string;
  declare tapa_aceite: string;
  declare tapa_gasolina: string;
  declare tapa_radiador: string;
  declare tapetes: string;
  declare varilla_aceite: string;
  declare revision_externa?: string;
  declare observacion2?: string;
  declare delanteros: string;
  declare traseros: string;
  declare repuestos: string;
  declare observacion3?: string;
  declare principal: string;
  declare emergencia: string;
  declare observacion4?: string;
  declare extintor_vigente: string;
  declare cinturones_seguridad: string;
  declare caja_herramientas: string;
  declare gato: string;
  declare cuna: string;
  declare llave_rueda: string;
  declare botiquin: string;
  declare triangulo: string;
  declare observacion5?: string;
  declare licencia_transito: string;
  declare seguro: string;
  declare licencia_conduccion: string;
  declare revision: string;
  declare observacion6?: string;
  declare liquido_freno: string;
  declare acite: string;
  declare refrigerante: string;
  declare observacion7?: string;
  declare amortiguadores: string;
  declare cardan: string;
  declare caja_cambios: string;
  declare observacion8?: string;
  declare imagen_inspeccion1?: string;
  declare observacion9?: string;
  declare imagen_inspeccion2?: string;
  declare observacion10?: string;
  declare imagen_inspeccion3?: string;
  declare observacion11?: string;
  declare firma_administracion?: string;
  declare firma_conductor?: string;
}

const initEmpresa = (zona: string) => {
  const empresa =
    zona === "Multired"
      ? "chequeo_vehicular_multred_new"
      : "chequeo_vehicular_servired_new";
  Chequeo_vehiclar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kilometraje: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      l_baja: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      l_alta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      l_marcha_atras: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      l_interior: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      l_freno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estacionarias: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      viraje_derecho: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      viraje_izquierdo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      radio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pitos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parabrisas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vidrios_laterales: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manillas_alza_vidrios: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Bateria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      espejos_retrovisores: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cerraduras: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plumillas_limpia_vidrios: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dispositivo_velocidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tapa_aceite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tapa_gasolina: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tapa_radiador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tapetes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      varilla_aceite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      revision_externa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observacion2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      delanteros: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      traseros: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      repuestos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      principal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergencia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion4: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      extintor_vigente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cinturones_seguridad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caja_herramientas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gato: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuna: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      llave_rueda: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      botiquin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      triangulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion5: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      licencia_transito: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seguro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licencia_conduccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      revision: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion6: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      liquido_freno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refrigerante: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion7: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amortiguadores: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caja_cambios: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion8: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen_inspeccion1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observacion9: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen_inspeccion2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observacion10: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen_inspeccion3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      observacion11: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firma_administracion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firma_conductor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: dbChequeo,
      modelName: "Programacion",
      tableName: empresa,
      timestamps: false,
    },
  );
};

export { initEmpresa, Chequeo_vehiclar };
