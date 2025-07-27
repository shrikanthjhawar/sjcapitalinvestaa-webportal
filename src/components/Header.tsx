import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', type: 'scroll', targetId: 'hero' },
  { name: 'About', type: 'scroll', targetId: 'about' },
  { name: 'Services', type: 'scroll', targetId: 'services' },
  { name: 'Calculators', type: 'link', path: '/calculators' },
  { name: 'Risk Profile', type: 'link', path: '/risk-profile' },
  { name: 'Blogs', type: 'link', path: '/blogs' },
  { name: 'Contact', type: 'scroll', targetId: 'booking-contact' },
];

const externalLinks = [
    { name: 'Client Login', href: '' }, // Add your client login URL here
];

const ctaLinks = [
    { name: 'Sign Up', href: '' }, // Add your sign up URL here
];


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state if user scrolls down more than 10px
      setIsScrolled(window.scrollY > 10);
    };

    // Only add scroll listener on the homepage
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    } else {
      // On other pages, header is always solid
      setIsScrolled(true);
    }

    // Cleanup listener
    return () => {
      if (location.pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-900/95 backdrop-blur-md border-b border-blue-800' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-900" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              SJ Capital Investaa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              link.type === 'scroll' ? (
                <button key={link.name} onClick={() => scrollToSection(link.targetId)} className={`font-medium transition-colors duration-200 ${location.pathname === '/' ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}>
                  {link.name}
                </button>
              ) : (
                <Link key={link.name} to={link.path!} className={`font-medium transition-colors duration-200 ${location.pathname.startsWith(link.path!) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}>
                  {link.name}
                </Link>
              )
            ))}
            {externalLinks.map(link => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                {link.name}
              </a>
            ))}
            {ctaLinks.map(link => (
              <a key={link.name} href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-5 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                {link.name}
              </a>
            ))}
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
              {navLinks.map(link => (
                link.type === 'scroll' ? (
                  <button key={link.name} onClick={() => scrollToSection(link.targetId)} className="py-2 text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left">
                    {link.name}
                  </button>
                ) : (
                  <Link key={link.name} to={link.path!} onClick={() => setIsMenuOpen(false)} className={`py-2 text-lg font-medium transition-colors duration-200 text-left ${location.pathname.startsWith(link.path!) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}>
                    {link.name}
                  </Link>
                )
              ))}
              <div className="border-t border-blue-700 my-2"></div>
              {externalLinks.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="py-2 text-lg font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left">
                  {link.name}
                </a>
              ))}
              {ctaLinks.map(link => (
                <a key={link.name} href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
              >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;