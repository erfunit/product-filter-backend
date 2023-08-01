const express = require("express");
const { productRouter } = require("./routes/product.router");
const { connect } = require("./utils/connect");

const app = express();

const PORT = 5001;

connect();

app.use(express.json());

app.listen(PORT, () => {
  console.log("the server is running on port" + PORT);
});

app.use("/products", productRouter);
