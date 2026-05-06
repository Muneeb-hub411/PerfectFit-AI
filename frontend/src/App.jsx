import React from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Protected.jsx";
import Dashboard from "./pages/Dashboard";
import { ReportProvider } from "./context/reportContext.jsx";
const App = () => {
  return (
    <AuthProvider>
      <ReportProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
        <ToastContainer />
      </ReportProvider>
    </AuthProvider>
  );
};

export default App;
