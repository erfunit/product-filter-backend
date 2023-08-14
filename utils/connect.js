const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = { sequelize, connect };
