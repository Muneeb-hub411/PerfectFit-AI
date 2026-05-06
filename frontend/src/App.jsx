import React from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Protected.jsx";
import Dashboard from "./pages/Dashboard";
import { ReportProvider } from "./context/reportContext.jsx";
import ReportDetail from "./pages/ReportDetail.jsx";
import MyReports from "./pages/MyReports.jsx";
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
          <Route
            path="/my-reports"
            element={
              <Protected>
                <MyReports />
              </Protected>
            }
          />
          <Route
            path="/report/:id"
            element={
              <Protected>
                <ReportDetail />
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
