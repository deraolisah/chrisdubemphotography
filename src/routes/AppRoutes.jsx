// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Book from "../pages/Book.jsx"; // Add this import

function AppRoutes() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-dark text-white font-body -tracking-[0.5px] pt-10 md:pt-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />      
        <Route path="/about" element={<About /> } />      
        <Route path="/book" element={<Book /> } /> {/* Add this route */}
        <Route path="/contact" element={<Contact /> } /> 

        <Route path="*" element={<h1 className="py-20 text-center"> Not Found </h1> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default AppRoutes;