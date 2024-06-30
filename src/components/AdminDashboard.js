import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/api/products/${id}`)
      .then(() => {
        console.log("Product deleted successfully");
        fetchProducts();
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
                {/* Add edit button and functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add form to create new product here */}
    </div>
  );
}

export default AdminDashboard;
