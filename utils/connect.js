const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connect = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database!");
    connection.release();
  });
};

module.exports = { connect };
