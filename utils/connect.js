const mongoose = require("mongoose");

async function connect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/filterProducts")
    .then(() => console.log("connected!"))
    .catch((error) => console.log(error));
}

module.exports = { connect };
