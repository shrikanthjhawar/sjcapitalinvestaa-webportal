import React, { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Refactored for better readability and to avoid code duplication.
  const scrollToSection = (sectionId: string) => {
    const performScroll = () => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(performScroll, 100);
    } else {
      performScroll();
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
            <span className="text-xl font-extrabold text-white tracking-tight">SJ Capital Investaa</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className={`font-medium transition-colors duration-200 ${location.pathname === '/' ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Services
            </button>
            <Link
              to="/calculators"
              className={`font-medium transition-colors duration-200 ${location.pathname.startsWith('/calculators') ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              Calculators
            </Link>
            <Link
              to="/risk-profile"
              className={`font-medium transition-colors duration-200 ${location.pathname.startsWith('/risk-profile') ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              Risk Profile
            </Link>
            <Link
              to="/blogs"
              className={`font-medium transition-colors duration-200 ${location.pathname.startsWith('/blogs') ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              Blogs
            </Link>
            <button
              onClick={() => scrollToSection('booking-contact')}
              className="font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Contact
            </button>
            <a 
              href="" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200"
            >
              Client Login
            </a>
            <a 
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-5 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign Up
            </a>
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
                className={`py-2 text-lg font-medium transition-colors duration-200 text-left ${location.pathname === '/' ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="py-2 text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="py-2 text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Services
              </button>
              <Link
                to="/calculators"
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-lg font-medium transition-colors duration-200 text-left ${location.pathname.startsWith('/calculators') ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
              >
                Calculators
              </Link>
              <Link
                to="/risk-profile"
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-lg font-medium transition-colors duration-200 text-left ${location.pathname.startsWith('/risk-profile') ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
              >
                Risk Profile
              </Link>
              <Link
                to="/blogs"
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-lg font-medium transition-colors duration-200 text-left ${location.pathname.startsWith('/blogs') ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
              >
                Blogs
              </Link>
              <button
                onClick={() => scrollToSection('booking-contact')}
                className="py-2 text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Contact
              </button>
              <div className="border-t border-blue-700 my-2"></div>
              <a 
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                Client Login
              </a>
              <a 
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
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