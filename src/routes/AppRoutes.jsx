// AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Book from "../pages/Book.jsx";
import Contact from "../pages/Contact.jsx";
import Terms from "../pages/Terms.jsx";
import Protection from "../pages/Protection.jsx";
import Imprint from "../pages/Imprint.jsx";
import Accessibility from "../pages/Accessibility.jsx";

function AppRoutes() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-dark text-white font-body -tracking-[0.5px] pt-10 md:pt-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />      
        <Route path="/about" element={<About /> } />      
        <Route path="/book" element={<Book /> } />
        <Route path="/contact" element={<Contact /> } /> 
        <Route path="/terms" element={<Terms />} />
        <Route path="/protection" element={<Protection />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/accessibility" element={<Accessibility />} />

        <Route path="*" element={<h1 className="py-20 text-center"> Not Found </h1> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default AppRoutes;