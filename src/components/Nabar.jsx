import React, { useState } from "react";

const Navbar = ({ goToContact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="p-4 flex justify-between items-center z-10 bg-transparent">
      <h2 
        style={{
          backgroundImage: "linear-gradient(179.571deg, rgb(255, 135, 60) 0%, rgb(13, 13, 13) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
        className="text-2xl font-bold"
      >
        THEBITCOIN.COM
      </h2>
      <div className="hidden sm:flex space-x-4">
        <a
          onClick={goToContact}
          className="font-bold text-white cursor-pointer"
        >
          Contact Us
        </a>
      </div>

      <div className="sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-white cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-gray-800 p-4 rounded shadow-lg z-10">
          <a
            onClick={goToContact}
            className="block font-bold text-white cursor-pointer"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
