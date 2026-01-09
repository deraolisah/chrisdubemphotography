import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between p-4'>
      <Link to='/' className="font-bold">
        CHRIS.
      </Link>


      <ul className='flex items-center gap-6'>
        <li className=''><Link to="/"> Home </Link></li>
        <li className=''><Link to="/about"> About </Link></li>
        <li className=''><Link to="/portfolio"> Portfolio </Link></li>
        <li className=''><Link to="/Let's Talk"> Let's Talk </Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;