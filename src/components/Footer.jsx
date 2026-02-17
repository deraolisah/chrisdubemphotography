import { Link } from "react-router-dom";
import logo from "../assets/logo-horizontal.png";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-800 bg-black mt-16">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">

        <div className="flex flex-col gap-2">
          <img src={logo} alt="" className="w-40 object-cover mb-2"/>
          <p className="text-gray-400">
            Professional personal branding and corporate photography for leaders, teams, and growing brands/businesses.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-medium mb-2 uppercase">Quick Links</h4>
          <div className="flex flex-col gap-2 text-gray-400">
            <Link className="hover:text-primary" to="/">Home</Link>
            <Link className="hover:text-primary" to="/about">About</Link>
            <Link className="hover:text-primary" to="/book">Book</Link>
            <Link className="hover:text-primary" to="/contact">Contact</Link>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-3">
          <h4 className="font-medium mb-2 uppercase">Contact</h4>
          <a href="#" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-primary truncate">
            <Mail size={16} />
            hello@chrisdubemphotography.com
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-primary">
            <MapPin size={16} />
            Basel, Switzerland
          </a>
          <a href="https://instagram.com/" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-primary">
            <Instagram size={16} />
            Instagram
          </a>
          <a href="https://linkedin.com/in/" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-primary">
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </div>


      <hr className="flex my-10 h-px border-0 bg-gray-800"/>


      <button className="text-center flex items-center justify-center w-full py-4 cursor-pointer" onClick={() => { scrollTo(0,0) }}> 
        Back to Top 
      </button>


      <hr className="flex my-10 h-px border-0 bg-gray-800"/>

      <div className="my-4 mx-auto text-center text-sm text-gray-400 flex items-center justify-center gap-4 gap-y-2 flex-wrap">
        <p> Data Protection  </p>
        <p> Imprint </p>
        <p> Accessibility </p>
        <p> Terms & Conditions </p>
      </div>

      <div className="text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} - All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;