const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const connect = async () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      authSource: "admin",
    })
    .then(() => console.log("database connected!"))
    .catch((error) => console.log(error));
};

module.exports = { connect };
