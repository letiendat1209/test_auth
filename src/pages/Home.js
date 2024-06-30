// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our Shoe Store</h1>
      <p>Find the perfect pair for every occasion.</p>
      <Link to="/products" className="cta-button">
        Shop Now
      </Link>
    </div>
  );
}

export default Home;
