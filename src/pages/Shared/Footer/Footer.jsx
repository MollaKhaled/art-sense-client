import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content text-sm py-6">
    <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4">
      {/* Facebook Link */}
      <div className="mb-4 md:mb-0">
        <Link
          to="https://www.facebook.com/artsensebd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-red-500">f</span>/<span className="text-red-500">a</span>rt
          <span className="text-red-500">s</span>ense
        </Link>
      </div>

      {/* Contact Info & Copyright */}
      <div className="flex flex-col items-center md:items-end space-y-2">
        <p>
          +880 1718 876332
          <span className="text-red-500"> | </span>artsensebdgallery@gmail.com
        </p>
        
        <div className="flex items-center gap-1">
          <h1>
            &copy; 02.02.2024 by
            <span className="text-red-500"> a</span>rt
            <span className="text-red-500">s</span>ense
            <span className="text-red-500"> | </span>Powered By, MH.Khaled
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
    </div>
  </footer>


  );
};

export default Footer;


