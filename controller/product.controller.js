const mysql = require("mysql2");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const addNewProduct = async (req, res) => {
  try {
    const { name, price, tags, description } = req.body;

    if (!name || !price || !tags || !description) {
      return res
        .status(400)
        .json({ error: "To create a new product, please fill all the fields" });
    }

    const newProduct = {
      name,
      price,
      tags: JSON.stringify(tags),
      description,
    };

    pool.query(
      "INSERT INTO products (name, price, tags, description) VALUES (?, ?, ?, ?)",
      [
        newProduct.name,
        newProduct.price,
        newProduct.tags,
        newProduct.description,
      ],
      (err, results) => {
        if (err) {
          console.error("Error adding new product:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        const insertedProductId = results.insertId;
        res.status(201).json({
          message: "New product added successfully!",
          data: { id: insertedProductId, ...newProduct },
        });
      }
    );
  } catch (error) {
    console.error("Error adding new product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    pool.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const showOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    pool.query(
      "SELECT * FROM products WHERE id = ?",
      [productId],
      (err, results) => {
        if (err) {
          console.error("Error fetching product:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        const product = results[0];
        res.json({ data: product });
      }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    pool.query(
      "SELECT * FROM products WHERE id = ?",
      [productId],
      (err, results) => {
        if (err) {
          console.error("Error fetching product:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        const product = results[0];

        pool.query(
          "DELETE FROM products WHERE id = ?",
          [productId],
          (err, results) => {
            if (err) {
              console.error("Error deleting product:", err);
              return res.status(500).json({ message: "Internal server error" });
            }
            res.json({
              message: "Product deleted successfully!",
              data: product,
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    pool.query(
      "SELECT * FROM products WHERE id = ?",
      [productId],
      (err, results) => {
        if (err) {
          console.error("Error fetching product:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "Product not found" });
        }

        const existingProduct = results[0];

        pool.query(
          "UPDATE products SET name = ?, price = ?, tags = ?, description = ? WHERE id = ?",
          [
            updatedData.name,
            updatedData.price,
            JSON.stringify(updatedData.tags),
            updatedData.description,
            productId,
          ],
          (err, results) => {
            if (err) {
              console.error("Error updating product:", err);
              return res.status(500).json({ message: "Internal server error" });
            }
            res.json({
              message: "Product updated successfully!",
              data: { id: productId, ...updatedData },
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addNewProduct,
  getProducts,
  deleteProduct,
  showOneProduct,
  updateProduct,
};
