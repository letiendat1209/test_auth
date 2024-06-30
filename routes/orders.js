// routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");

// Tạo đơn hàng mới
router.post("/", authenticateToken, async (req, res) => {
  const { products } = req.body;
  const userId = req.user.userId;

  try {
    // Bắt đầu transaction
    await db.query("START TRANSACTION");

    // Tạo đơn hàng
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
      [userId, 0]
    );
    const orderId = orderResult.insertId;

    // Thêm các sản phẩm vào đơn hàng và tính tổng giá
    let totalPrice = 0;
    for (const product of products) {
      const [productInfo] = await db.query(
        "SELECT price FROM products WHERE id = ?",
        [product.id]
      );
      const price = productInfo[0].price;
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, product.id, product.quantity, price]
      );
      totalPrice += price * product.quantity;
    }

    // Cập nhật tổng giá đơn hàng
    await db.query("UPDATE orders SET total_price = ? WHERE id = ?", [
      totalPrice,
      orderId,
    ]);

    // Commit transaction
    await db.query("COMMIT");

    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (error) {
    // Rollback nếu có lỗi
    await db.query("ROLLBACK");
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Lấy danh sách đơn hàng của user
router.get("/user", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ?", [
      userId,
    ]);
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
