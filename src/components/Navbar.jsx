import React from 'react';
import { Link } from "react-router-dom";
import { TextAlignJustify } from 'lucide-react';
import logo from "../assets/logo-horizontal.png";

const Navbar = () => {
  return (
    <nav className='container mx-auto px-4 flex items-center justify-between h-12 md:h-20'>
      <Link to='/' className="">
        <img src={logo} alt='' className='h-6' />
      </Link>


      <TextAlignJustify className='flex md:hidden cursor-pointer' />

      <ul className='hidden md:flex items-center gap-6 uppercase text-sm'>
        <li className=''><Link to="/"> Home </Link></li>
        |
        <li className=''><Link to="/about"> About </Link></li>
        |
        <li className=''><Link to="/journal"> Journal </Link></li>
        |
        <li className=''><Link to="/contact"> Contact </Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;