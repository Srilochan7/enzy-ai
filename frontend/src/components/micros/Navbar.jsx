import React, { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-pink-50 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">StyleAI</span>
          </div>
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
            Assistant
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
            Wardrobe
          </a>
        </div>
        
        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <Search size={20} />
          </button>
          
          {/* User Icon */}
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <User size={20} />
          </button>
          
          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-pink-100">
          <div className="flex flex-col space-y-4 pt-4">
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2"
              onClick={toggleMobileMenu}
            >
              Assistant
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2"
              onClick={toggleMobileMenu}
            >
              Wardrobe
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;