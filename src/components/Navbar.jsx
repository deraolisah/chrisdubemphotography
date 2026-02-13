import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { TextAlignJustify } from 'lucide-react';
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

  
  //   useEffect(() => {
  //   if (modalOpened) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [modalOpened]);

  return (
    <nav className='container mx-auto px-4 flex items-center justify-between h-12 md:h-20 relative'>
      <Link to='/' className="">
        <img src={logo} alt='' className='h-6' />
      </Link>


      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-navy-100 hover:text-white focus:outline-none cursor-pointer">
        {!isMenuOpen ? (
          <TextAlignJustify className='flex md:hidden cursor-pointer' />
        ) : (
          <svg
            className="h-6 w-6"
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

      <ul className='hidden md:flex items-center gap-6 uppercase text-sm'>
        <li className=''><Link to="/"> Home </Link></li>
        |
        <li className=''><Link to="/about"> About </Link></li>
        |
        <li className=''><Link to="/book"> Book </Link></li>
        |
        <li className=''><Link to="/contact"> Contact </Link></li>
      </ul>


      {/* {isMenuOpen && ( */}
        <div className={`md:hidden bg-dark w-full h-screen absolute z-100 top-12 left-0 transition-all duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <ul className='flex flex-col items-center gap-6 uppercase text-sm py-4'>
            <li className=''><Link to="/"> Home </Link></li>
            <li className=''><Link to="/about"> About </Link></li>
            <li className=''><Link to="/portfolio"> Portfolio </Link></li>
            <li className=''><Link to="/contact"> Contact </Link></li>
          </ul>
        </div>
      {/* )} */}
    </nav>
  )
}

export default Navbar;