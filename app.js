// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// Routes sẽ được thêm vào đây

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const db = require("./db");

db.query("SELECT 1")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));
