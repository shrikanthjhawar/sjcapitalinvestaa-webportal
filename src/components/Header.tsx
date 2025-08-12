import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import fullLogo from '/images/sj_logo.png';

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
  const location = useLocation();
  const navigate = useNavigate();

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
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4">
            <img src={fullLogo} alt="SJ Capital Investaa Logo" className="h-12 w-auto object-contain" />
            <div className="flex items-baseline text-2xl font-bold ml-2">
              <span className="text-primary mr-1">SJ CAPITAL</span>
              <span className="text-accent"> INVESTAA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              link.type === 'scroll' ? (
                <button key={link.name} onClick={() => scrollToSection(link.targetId)} className="font-medium hover:text-accent transition-colors duration-200 text-primary/80">
                  {link.name}
                </button>
              ) : (
                <Link key={link.name} to={link.path!} className={`font-medium transition-colors duration-200 ${location.pathname.startsWith(link.path!) ? 'text-accent' : 'text-primary/80'} hover:text-accent`}>
                  {link.name}
                </Link>
              )
            ))}
            {externalLinks.map(link => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent transition-colors duration-200 text-primary/80">
                {link.name}
              </a>
            ))}
            {ctaLinks.map(link => (
              <a key={link.name} href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-primary px-5 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-accent transition-colors duration-200 text-primary/80"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden rounded-lg mt-2 p-4 transition-colors duration-300 bg-white">
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                link.type === 'scroll' ? (
                  <button key={link.name} onClick={() => scrollToSection(link.targetId)} className="py-2 text-lg font-medium hover:text-accent transition-colors duration-200 text-left text-primary/80">
                    {link.name}
                  </button>
                ) : (
                  <Link key={link.name} to={link.path!} onClick={() => setIsMenuOpen(false)} className={`py-2 text-lg font-medium transition-colors duration-200 text-left ${location.pathname.startsWith(link.path!) ? 'text-accent' : 'text-primary/80'} hover:text-accent`}>
                    {link.name}
                  </Link>
                )
              ))}
              <div className="border-t my-2 transition-colors duration-300 border-primary/20"></div>
              {externalLinks.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="py-2 text-lg font-medium hover:text-accent transition-colors duration-200 text-left text-primary/80">
                  {link.name}
                </a>
              ))}
              {ctaLinks.map(link => (
                <a key={link.name} href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200"
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

