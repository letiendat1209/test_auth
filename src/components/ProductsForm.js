// src/components/ProductForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({ editingProduct, setEditingProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setImageUrl(editingProduct.image_url);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price: parseFloat(price),
      image_url,
    };

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:3000/api/products/${editingProduct.id}`,
          productData
        );
      } else {
        await axios.post("http://localhost:3000/api/products", productData);
      }
      resetForm();
      // Refresh product list
      // You might want to lift this state up or use a global state management solution
      window.location.reload();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setEditingProduct(null);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="image_url">Image URL:</label>
        <input
          type="text"
          id="image_url"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">{editingProduct ? "Update" : "Add"} Product</button>
      {editingProduct && (
        <button type="button" onClick={resetForm}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default ProductForm;
