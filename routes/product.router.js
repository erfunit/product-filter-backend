const express = require("express");
const {
  addNewProduct,
  getProducts,
} = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.post("/", addNewProduct);
productRouter.get("/", getProducts);

module.exports = { productRouter };
