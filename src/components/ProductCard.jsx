import React, { useState } from "react";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add items to the cart.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://lpukart-server.onrender.com/verse/cart",
        {
          productId: product._id,
          quantity: 1, // Default quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added to cart:", response.data);
      alert("Product added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Failed to add product to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7EED3] shadow-lg rounded-lg overflow-hidden p-4">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#674636] capitalize">
          {product.name}
        </h3>
        <p className="text-sm text-[#674636]/80">{product.category}</p>
        <p className="mt-2 text-lg font-semibold text-[#674636]">
        ₹{product.cost}
        </p>
        <p className="mt-1 text-[#674636]">⭐ {product.rating}/5</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-[#674636] text-[#FFF8E8] font-semibold py-2 px-4 rounded-lg hover:bg-[#AAB396] transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
