import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://lpukart-server.onrender.com/verse/products"
        );
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#FFF8E8]">

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#674636]">
            Bestsellers Products
          </h2>
          <p className="mt-2 text-lg text-[#674636]">
          Discover the latest trends, unbeatable prices, and a seamless shopping experience.
          Shop now and upgrade your lifestyle effortlessly!
          </p>

          {loading && <p className="text-[#674636] mt-4">Loading products...</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loading &&
              !error &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default HomePage;
