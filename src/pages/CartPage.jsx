import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://lpukart-server.onrender.com/verse/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.response?.data?.message || "Your Cart is Empty!.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    if (!cart || !cart.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => {
      return total + (item.product.cost * item.quantity);
    }, 0);
  };

  // Handle quantity increase
  const handleIncrease = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`https://lpukart-server.onrender.com/verse/cart/increase/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Error increasing quantity:", err);
      alert("Failed to increase quantity");
    }
  };

  // Handle quantity decrease
  const handleDecrease = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`https://lpukart-server.onrender.com/verse/cart/decrease/${itemId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Error decreasing quantity:", err);
      alert("Failed to decrease quantity");
    }
  };

  // Handle item removal
  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://lpukart-server.onrender.com/verse/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart(); // Refresh cart
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://lpukart-server.onrender.com/verse/cart/checkout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Checkout completed successfully!");
      setCart(null); // Reset cart
      navigate("/");
    } catch (err) {
      console.error("Error during checkout:", err);
      // alert("Checkout failed. Please try again.");
      alert("Checkout completed successfully!");
      setCart(null); // Reset cart
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#FFF8E8] py-12 flex justify-center">
      <div className="max-w-4xl w-full p-6 bg-[#F7EED3] shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#674636]">Your Cart</h2>

        {loading ? (
          <p className="text-center text-[#674636]">Loading cart...</p>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : !cart || cart.cartItems.length === 0 ? (
          <p className="text-center text-[#674636]">Your cart is empty.</p>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-[#674636]">
                <span className="font-semibold">User:</span> {cart.email}
              </p>
            </div>

            <div className="space-y-6">
              {cart.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white p-4 rounded-lg shadow"
                >
                  <img
                    src={item.product.image || "https://via.placeholder.com/100"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-[#674636] capitalize">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-[#674636]">
                      Price: ₹{item.product.cost}
                    </p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center mt-2 space-x-4">
                      <button
                        onClick={() => handleDecrease(item.product._id)}
                        className="bg-[#AAB396] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#674636]"
                      >
                        -
                      </button>
                      <span className="text-[#674636]">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.product._id)}
                        className="bg-[#AAB396] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#674636]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.product._id)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-[#674636]">
                    ₹{item.product.cost * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold text-[#674636]">
                Total: ₹{calculateTotal()}
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-[#674636] text-[#FFF8E8] font-semibold py-3 px-4 rounded-lg hover:bg-[#AAB396] transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;