import React, { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-blue-900/95 backdrop-blur-md border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-900" />
            </div>
            <span className="text-xl font-bold text-white">SJ Capital Investaa</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              SIP Calculator
            </button>
              <button
              onClick={() => scrollToSection('booking-contact')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Contact
            </button>
            {/*<a 
              href="https://demo.investwell.app/app/#/login" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 border border-gray-600 hover:border-yellow-400 px-4 py-2 rounded-lg"
            >
              Client Login
            </a>
            <a 
              href="https://demo.investwell.app/app/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
            >
              Sign Up
            </a>*/}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-yellow-400 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                SIP Calculator
              </button>
              <a 
                href="https://demo.investwell.app/app/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left border border-gray-600 hover:border-yellow-400 px-4 py-2 rounded-lg"
              >
                Client Login
              </a>
              <a 
                href="https://demo.investwell.app/app/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 text-left"
              >
                Sign Up
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;