import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content text-sm p-4">
  {/* Logo Centered on Small Screens */}
  <div className="text-3xl text-center md:text-left">
    <Link to="/">
      <span className="text-red-600">a</span>rt
      <span className="text-red-600">s</span>ense
    </Link>
  </div>

  {/* Responsive Footer Content */}
  <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
    {/* Left Section */}
    <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
      <div>
        <Link
          to="https://www.facebook.com/artsensebd"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <span className="text-red-500">f</span>/<span className="text-red-500">a</span>rt
          <span className="text-red-500">s</span>ense
        </Link>
      </div>
      <div>
        <p>
          +880 1718 876332
          <span className="text-red-500"> | </span>artsensebdgallery@gmail.com
        </p>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col md:flex-row items-center lg:gap-2 text-center md:text-left">
      <h1>
        &copy; 02.02.2024 by
        <span className="text-red-500"> a</span>rt
        <span className="text-red-500">s</span>ense
        <span className="text-red-500"> | </span>Powered By MH.Khaled
      </h1>
      <Link
        to="https://www.linkedin.com/in/molla-khaled-hossain/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        <FaLinkedin size={20} />
      </Link>
    </div>
  </div>
</footer>


  


  );
};

export default Footer;


