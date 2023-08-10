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

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await ProductModel.findByIdAndDelete(productId);

    return res.json({
      message: "محصول مورد نظر با موفقیت حذف شد!",
      data: product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const showOneProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (product) res.json({ data: product });
    else res.status(404).json({ message: "محصول مورد نظر یافت نشد!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "خطا در برقراری ارتباط", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "محصولی یافت نشد!" });
    }

    return res.json({
      message: "اطلاعات محصول مورد نظر با موفقیت اپدیت شد",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "مشکلی در سرور رخ داده" });
  }
};

module.exports = {
  addNewProduct,
  getProducts,
  deleteProduct,
  showOneProduct,
  updateProduct,
};
