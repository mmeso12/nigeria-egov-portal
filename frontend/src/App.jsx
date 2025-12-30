import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Apply from "./pages/Apply";
import Status from "./pages/Status";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./pages/AdminDashboard";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/status" element={<Status />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
