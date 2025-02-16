import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

const Navbar = () => {
  const { user, logout, loading } = useUser();

  return (
    <nav className="bg-[#674636] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-[#FFF8E8] text-2xl font-bold">
          LPUKART
        </Link>

        <div className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-[#FFF8E8] hover:text-[#F7EED3] transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-[#FFF8E8] hover:text-[#F7EED3] transition font-medium"
          >
            Cart
          </Link>

          {/* Show User Info & Logout if logged in */}
          {loading ? (
            <p className="text-[#FFF8E8]">Loading...</p>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <p className="text-[#FFF8E8] font-medium">
                {user.name} ({user.email})
              </p>
              <button
                onClick={logout}
                className="bg-[#AAB396] px-4 py-2 rounded text-[#FFF8E8] font-medium hover:bg-[#F7EED3] hover:text-[#674636] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#FFF8E8] hover:text-[#F7EED3] transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#FFF8E8] hover:text-[#F7EED3] transition font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
