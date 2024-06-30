// src/pages/AdminDashboard.js
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductsForm";

function AdminDashboard() {
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <ProductForm
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />
      <ProductList setEditingProduct={setEditingProduct} />
    </div>
  );
}

export default AdminDashboard;
