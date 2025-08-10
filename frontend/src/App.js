import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Coach from "./components/Coach";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import YourChild from "./pages/YourChild";
import PayFees from "./pages/PayFees";

function App() {
  const PrivateAdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
      // You can show a spinner or nothing while checking
      return <div className="admin-loading">Loading...</div>;
    }

    if (!user || user.email !== "vaibhav@example.com") {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          }
        />
        <Route path="/your-child" element={<YourChild />} />
        <Route path="/pay-fees/:studentId" element={<PayFees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
