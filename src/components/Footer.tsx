import React from 'react';
import { Phone, Mail, MapPin, TrendingUp, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {

  const services = [
    'Mutual Fund Advisory',
    'SIP Planning',
    'Portfolio Management',
    'Tax-Saving Funds',
    'Retirement Planning',
    'Goal-Based Investing'
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // This function now handles navigation from other pages back to home sections
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
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-accent p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">SJ Capital Investaa</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              Your trusted partner for mutual fund investments and wealth management. 
              We help you achieve your financial goals through strategic investment planning and expert advisory services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent">Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('hero')} className="text-white/70 hover:text-accent transition-colors duration-200">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-accent transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/70 hover:text-accent transition-colors duration-200">Services</button></li>
              <li>
                <Link to="/calculators" className="text-white/70 hover:text-accent transition-colors duration-200">
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-white/70 hover:text-accent transition-colors duration-200">
                  Blogs
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('booking-contact')} className="text-white/70 hover:text-accent transition-colors duration-200">Contact</button>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/70 hover:text-accent transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-accent">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-white/70">+91 93922 65654</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-white/70">shrikanth@sjcapital.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="text-white/70">Hyderabad, Telangana</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-accent">Business Hours</h3>
              <div className="space-y-2 text-white/70">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-4 text-accent">Regulatory Info</h3>
              <div className="space-y-2 text-white/70">
               {/*// <p>SEBI Reg. No: INH000000000</p>*/}
               {/*// <p>AMFI Reg. No: ARN-000000</p>
                <p>CIN: U65990MH2008PTC123456</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © 2025 SJ Capital Investaa. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-white/70 hover:text-accent text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/20 text-center p-6">
        <p className="text-xs text-white/60 leading-relaxed max-w-5xl mx-auto">
          <strong>Risk Factors:</strong> Investments in Mutual Funds are subject to market risks. Read all scheme-related documents carefully before investing. Mutual Fund schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in the future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other cost structures (TER) applicable at the time of making the investment before finalizing any investment decision for Mutual Funds schemes. We deal in Regular Plans only for Mutual Fund Schemes and earn a Trailing Commission on client investments.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
