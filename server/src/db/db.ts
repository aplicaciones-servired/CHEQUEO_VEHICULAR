import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const DB_CHEQUEO_USER = process.env.DB_CHEQUEO_USER
const DB_CHEQUEO_PASS = process.env.DB_CHEQUEO_PASS
const DB_CHEQUEO_HOST = process.env.DB_CHEQUEO_HOST
const DB_CHEQUEO_USE = process.env.DB_CHEQUEO_USE
const DB_PORT = process.env.DB_PORT

const dbChequeo = new Sequelize(DB_CHEQUEO_USE!, DB_CHEQUEO_USER!, DB_CHEQUEO_PASS!, {
  host: DB_CHEQUEO_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: false,
});

export default dbChequeo;