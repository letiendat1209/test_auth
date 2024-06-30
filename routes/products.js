// routes/products.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Thêm sản phẩm mới (chỉ admin)
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { name, description, price, image_url, stock } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, image_url, stock]
    );
    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});

// Cập nhật sản phẩm (chỉ admin)
router.put("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { name, description, price, image_url, stock } = req.body;
  const productId = req.params.id;
  try {
    await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, stock = ? WHERE id = ?",
      [name, description, price, image_url, stock, productId]
    );
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Xóa sản phẩm (chỉ admin)
router.delete("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const productId = req.params.id;
  try {
    await db.query("DELETE FROM products WHERE id = ?", [productId]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
