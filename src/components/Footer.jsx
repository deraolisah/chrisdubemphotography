import { Link } from "react-router-dom";
import logo from "../assets/logo-horizontal.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-800 bg-black mt-12">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        <div className="flex flex-col gap-2">
          <img src={logo} alt="" className="w-40 object-cover mb-2"/>
          <p className="text-gray-400">
            Professional personal branding and corporate photography for leaders, teams, and growing businesses.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-medium mb-2 uppercase">Quick Links</h4>
          <div className="flex flex-col gap-2 text-gray-400">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/book">Book</Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-medium mb-2 uppercase">Contact</h4>
          <p className="text-gray-400">
            hello@photographer.com<br/>
          </p>
          <p className="text-gray-400">
            {/* +41 00 000 0000<br/> */}
            Basel, Switzerland
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-medium mb-2 uppercase">Socials</h4>
          <a href="https://instagram.com/" target="_blank" className="flex text-gray-400">
            Instagram
          </a>
          <a href="https://linkedin.com/in/" target="_blank" className="flex text-gray-400">
            LinkedIn
          </a>
        </div>
      </div>


      <hr className="flex my-10 h-px border-0 bg-gray-800"/>

      <div className="text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;