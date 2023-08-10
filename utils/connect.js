const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  mongoose
    .connect(process.env.DATABSE_URL, {
      auth: "admin",
    })
    .then(() => console.log("database connected!"))
    .catch((error) => console.log(error));
};

module.exports = { connect };
