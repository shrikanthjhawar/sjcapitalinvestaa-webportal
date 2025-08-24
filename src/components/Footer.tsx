import React from 'react';
import { Phone, Mail, MapPin, TrendingUp, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {

     const services = [
     'Mutual Fund Distribution',
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
    <footer className="bg-premium-gradient text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-primary-800/30"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-accent-gradient p-3 rounded-2xl shadow-glow">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-black">SJ Capital Investaa</span>
            </div>
                         <p className="text-white/80 mb-8 max-w-md leading-relaxed text-lg">
               Your trusted partner for mutual fund investments and wealth management. 
               We help you achieve your financial goals through strategic investment planning and expert distribution services.
             </p>
            


            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-accent/20 hover:shadow-glow transition-all duration-300 border border-white/20 group">
                <Facebook className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-accent/20 hover:shadow-glow transition-all duration-300 border border-white/20 group">
                <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-accent/20 hover:shadow-glow transition-all duration-300 border border-white/20 group">
                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-accent/20 hover:shadow-glow transition-all duration-300 border border-white/20 group">
                <Instagram className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-accent">Quick Links</h3>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection('hero')} className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                Home
              </button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                About Us
              </button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group">
                <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                Services
              </button></li>
              <li>
                <Link to="/calculators" className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                  Blogs
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('booking-contact')} className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-accent">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/80 hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-4"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-accent flex items-center gap-3">
                <Phone className="h-6 w-6" />
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">+91 93922 65654</div>
                    <div className="text-white/60 text-sm">Call us anytime</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">shrikanth@sjcapital.in</div>
                    <div className="text-white/60 text-sm">Email support</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Hyderabad, Telangana</div>
                    <div className="text-white/60 text-sm">Our location</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-accent">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Monday - Friday</span>
                  <span className="text-accent font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Saturday</span>
                  <span className="text-accent font-semibold">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Sunday</span>
                  <span className="text-white/60">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-accent">Regulatory Info</h3>
              <div className="space-y-3 text-white/80">
                                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                   <span>AMFI Registered (ARN-337604)</span>
                 </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>AMFI Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Fully Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2025 SJ Capital Investaa. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link to="/privacy-policy" className="text-white/70 hover:text-accent text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-white/70 hover:text-accent text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Risk Disclaimer */}
      <div className="bg-black/30 backdrop-blur-sm text-center p-8 border-t border-white/10">
        <p className="text-xs text-white/70 leading-relaxed max-w-6xl mx-auto">
                     <strong className="text-white">Risk Factors:</strong> Investments in Mutual Funds are subject to market risks. Read all scheme-related documents carefully before investing. Mutual Fund schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in the future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other cost structures (TER) applicable at the time of making the investment before finalizing any investment decision for Mutual Funds schemes. We are AMFI registered mutual fund distributor (ARN-337604) and deal in Regular Plans only for Mutual Fund Schemes and earn a Trailing Commission on client investments.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
