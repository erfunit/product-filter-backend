const { ProductModel } = require("../model/product.model");

const addNewProduct = async (req, res) => {
  const { name, price, tags, description } = req.body;

  if (!name || !price || !tags || !description) {
    res
      .status(403)
      .json({ error: "to create a new product, please fill all the fields" });
    return;
  } else {
    const newProduct = new ProductModel({
      name,
      price,
      tags,
      description,
    });

    newProduct.save();
    res
      .status(200)
      .json({ message: "new product added successfully!", data: newProduct });
  }
};

const getProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};

module.exports = { addNewProduct, getProducts };
