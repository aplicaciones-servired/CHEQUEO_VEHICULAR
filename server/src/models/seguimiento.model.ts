import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import dbChequeo from "../db/db";

class Segumineto_Login extends Model<
  InferAttributes<Segumineto_Login>,
  InferCreationAttributes<Segumineto_Login>
> {
  declare id?: number;
  declare fecha: string;
  declare nombre: string;
  declare cedula: string;
  declare empresa: string;
}


  Segumineto_Login.init(
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
        empresa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
   
    {
      sequelize: dbChequeo,
      modelName: "Segumineto_Login",
      tableName: 'seguimiento_login',
      timestamps: false,
    },
  );


export { Segumineto_Login };
