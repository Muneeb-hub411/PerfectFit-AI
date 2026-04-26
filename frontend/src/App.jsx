import React from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Protected.jsx";
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <Protected>
              <h1>Home</h1>
            </Protected>
          }
        />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
