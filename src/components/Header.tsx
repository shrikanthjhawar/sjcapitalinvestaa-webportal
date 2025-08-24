import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import fullLogo from '/images/logo_updated_FINAL_SVG.svg';

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
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg border-b border-neutral-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <img src={fullLogo} alt="SJ Capital Investaa Logo" className="h-20 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              link.type === 'scroll' ? (
                <button key={link.name} onClick={() => scrollToSection(link.targetId || 'hero')} className="font-semibold hover:text-accent transition-all duration-300 text-primary/80 relative group py-2">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link key={link.name} to={link.path || '/'} className={`font-semibold transition-all duration-300 relative group py-2 ${location.pathname.startsWith(link.path || '/') ? 'text-accent' : 'text-primary/80'} hover:text-accent`}>
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${location.pathname.startsWith(link.path || '/') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              )
            ))}
            {externalLinks.map(link => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent transition-all duration-300 text-primary/80 relative group py-2">
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            {ctaLinks.map(link => (
              <a key={link.name} href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-gradient text-primary px-6 py-3 rounded-2xl font-bold hover:shadow-glow transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-accent transition-colors duration-200 text-primary/80 p-2 rounded-lg hover:bg-accent/10"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden rounded-2xl mt-4 mb-4 p-6 transition-all duration-300 bg-white/95 backdrop-blur-lg border border-neutral-200 shadow-premium">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                link.type === 'scroll' ? (
                  <button key={link.name} onClick={() => scrollToSection(link.targetId || 'hero')} className="py-3 text-lg font-semibold hover:text-accent transition-all duration-300 text-left text-primary/80 hover:bg-accent/5 rounded-lg px-3">
                    {link.name}
                  </button>
                ) : (
                  <Link key={link.name} to={link.path || '/'} onClick={() => setIsMenuOpen(false)} className={`py-3 text-lg font-semibold transition-all duration-300 text-left hover:bg-accent/5 rounded-lg px-3 ${location.pathname.startsWith(link.path || '/') ? 'text-accent bg-accent/10' : 'text-primary/80'} hover:text-accent`}>
                    {link.name}
                  </Link>
                )
              ))}
              <div className="border-t my-4 transition-colors duration-300 border-neutral-200"></div>
              {externalLinks.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="py-3 text-lg font-semibold hover:text-accent transition-all duration-300 text-left text-primary/80 hover:bg-accent/5 rounded-lg px-3">
                  {link.name}
                </a>
              ))}
              {ctaLinks.map(link => (
                <a key={link.name} href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-center bg-accent-gradient text-primary px-8 py-4 rounded-2xl font-bold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
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

