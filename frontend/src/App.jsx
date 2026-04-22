import React from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
