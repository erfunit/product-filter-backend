const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  tags: [String],
  description: String,
});

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = { ProductModel };
