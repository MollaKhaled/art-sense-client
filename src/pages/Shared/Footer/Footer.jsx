import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content text-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center md:text-left">

        {/* Social Links and Copyright */}
        <div>
          <Link 
            to={"https://www.facebook.com/artsensebd"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mb-2"
          >
            <span className="text-red-500">f</span>/<span className="text-red-500">a</span>rt<span className="text-red-500">s</span>ense
          </Link>
          <h1>&copy; 02.02.2024 by <span className="text-red-500">a</span>rt<span className="text-red-500">s</span>ense</h1>
        </div>

         {/* Contact Information */}
         <div className='lg:ml-12'>
          <h1 className="block mb-1">+880 1718 876332</h1>
          <h1>artsensebdgallery@gmail.com</h1>
          
        </div>

        {/* Powered By Section */}
        <div className='lg:justify-items-end lg:ml-12'>
          <h1>Powered By</h1>
          <div className="flex justify-center md:justify-start gap-2 items-center mt-2">
            <h1>MK Hossain</h1>
            <Link 
              to={"https://www.linkedin.com/in/molla-khaled-hossain/"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;
