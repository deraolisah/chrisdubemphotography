import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin, TextAlignJustify, Twitter } from 'lucide-react';
import logo from "../assets/logo-horizontal.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if(isMenuOpen){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    } 
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  }

  
  //   useEffect(() => {
  //   if (modalOpened) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [modalOpened]);

  return (
    <nav className='container mx-auto px-4 flex items-center justify-between h-12 md:h-20 bg-dark fixed z-50 top-0 md:relative'>
      <Link to='/' className="" onClick={handleLinkClick}>
        <img src={logo} alt='' className='h-5 md:h-6' />
      </Link>


      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex md:hidden items-center justify-center py-2 rounded-md text-navy-100 hover:text-white focus:outline-none cursor-pointer">
        {!isMenuOpen ? (
          <TextAlignJustify size={24} className='flex md:hidden cursor-pointer' />
        ) : (
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      <ul className='hidden md:flex items-center gap-10 uppercase text-sm'>
        <NavLink 
          to="/"
          className={({ isActive }) =>
            `relative px-0 py-1 transition-colors duration-300 
          ${ isActive ? "text-primary font-medium after:w-full" : "text-gray-100 after:w-0 hover:after:w-full"} after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300`}> Home </NavLink>

        <NavLink 
          to="/about"
          className={({ isActive }) =>
            `relative px-0 py-1 transition-colors duration-300 
          ${ isActive ? "text-primary font-medium after:w-full" : "text-gray-100 after:w-0 hover:after:w-full"} after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300`}> About </NavLink>

        <NavLink 
          to="/book"
          className={({ isActive }) =>
            `relative px-0 py-1 transition-colors duration-300 
          ${ isActive ? "text-primary font-medium after:w-full" : "text-gray-100 after:w-0 hover:after:w-full"} after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300`}> Book </NavLink>

        <NavLink 
          to="/contact"
          className={({ isActive }) =>
            `relative px-0 py-1 transition-colors duration-300 
          ${ isActive ? "text-primary font-medium after:w-full" : "text-gray-100 after:w-0 hover:after:w-full"} after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300`}> Contact </NavLink>        
      </ul>


      {/* {isMenuOpen && ( */}
        <div className={`md:hidden bg-dark w-full h-screen absolute z-100 top-12 left-0 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <ul className='uppercase h-full flex flex-col items-center justify-between text-sm py-4'>
            <span></span>
            <span className='flex flex-col items-center gap-6'>
              <NavLink onClick={handleLinkClick} to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-200"}> Home </NavLink>
              <NavLink onClick={handleLinkClick} to="/about" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-200"}> About </NavLink>
              <NavLink onClick={handleLinkClick} to="/book" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-200"}> Book </NavLink>
              <NavLink onClick={handleLinkClick} to="/contact" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-200"}> Contact </NavLink>
            </span>

            <span className='flex items-center gap-4 sticky bottom-10'> 
              <a href=""> <Instagram />  </a>
              <a href=""> <Linkedin /> </a>
              <a href=""> <Twitter /> </a>
              <a href=""> <Facebook /> </a>
            </span>
          </ul>
        </div>
      {/* )} */}
    </nav>
  )
}

export default Navbar;