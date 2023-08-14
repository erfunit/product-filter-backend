const express = require("express");
const { productRouter } = require("./routes/product.router");
const { connect } = require("./utils/connect");

const app = express();

const PORT = 3000;

connect(); // Connect to MySQL database

app.use(express.json());

app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log("The server is running on port " + PORT);
});
