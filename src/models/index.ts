import { Dialect, Sequelize } from "sequelize";
import Locals from "../providers/Locals";
import UserModel from "../apis/user/UserModel";
import DeliveryPartnerModel from "../apis/delivery_partner/DeliveryPartnerModel";

const config = Locals.config();

const dbConnection = {
  HOST: config.host,
  USER: config.user,
  PASSWORD: config.dbPassword,
  DB: config.db,
  dialect: config.dialect,
  pool: {
    max: config.poolMax,
    min: config.poolMin,
    acquire: config.poolAcquire,
    idle: config.poolIdle,
  },
};

const sequelize = new Sequelize(
  dbConnection.DB,
  dbConnection.USER,
  dbConnection.PASSWORD,
  {
    host: dbConnection.HOST,
    dialect: dbConnection.dialect as Dialect,
    pool: {
      max: dbConnection.pool.max,
      min: dbConnection.pool.min,
      acquire: dbConnection.pool.acquire,
      idle: dbConnection.pool.idle,
    },
  }
);

const db = {
  Sequelize,
  sequelize,
  user: UserModel(sequelize),
  deliveryPartner: DeliveryPartnerModel(sequelize),
};

export default db;
