// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");

// Đăng ký
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Mã hóa mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Lưu user với mật khẩu đã mã hóa
    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Tạo và gửi token
    // ...
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
