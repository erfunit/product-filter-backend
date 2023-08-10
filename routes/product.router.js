const express = require("express");
const {
  addNewProduct,
  getProducts,
  showOneProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.post("/", addNewProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", showOneProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);

module.exports = { productRouter };
