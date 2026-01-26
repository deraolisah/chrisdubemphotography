import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Journal from "../pages/Journal.jsx";
import Contact from "../pages/Contact.jsx";


function AppRoutes() {
  return (
    <div className="min-h-screen bg-[#1D1D1D] text-white font-body -tracking-[0.5px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />      
        <Route path="/about" element={<About /> } />      
        <Route path="/journal" element={<Journal /> } />      
        <Route path="/contact" element={<Contact /> } />      
      </Routes>
    </div>
  );
}

export default AppRoutes;