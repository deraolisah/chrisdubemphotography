import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
// import Journal from "../pages/Journal.jsx";
import Contact from "../pages/Contact.jsx";
import Portfolio from "../pages/Portfolio.jsx";


function AppRoutes() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-dark text-white font-body -tracking-[0.5px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />      
        <Route path="/about" element={<About /> } />      
        {/* <Route path="/journal" element={<Journal /> } />      */}
        <Route path="/portfolio" element={<Portfolio /> } />      
        <Route path="/contact" element={<Contact /> } />      
      </Routes>
      <Footer />
    </div>
  );
}

export default AppRoutes;