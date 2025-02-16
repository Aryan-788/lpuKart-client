import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// Import your components (make sure you have created these components)
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import { UserProvider } from "./context/userContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Homepage route */}
          <Route path="/" element={<HomePage />} />

          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Signup route */}
          <Route path="/signup" element={<SignupPage />} />

          {/* Cart route */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
