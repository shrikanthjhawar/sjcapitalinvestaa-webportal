import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Phone } from 'lucide-react';

interface CallToActionButtonsProps {
  introText?: string;
  containerClassName?: string;
  showInvestButton?: boolean;
  showAdvisorButton?: boolean;
}

const CallToActionButtons: React.FC<CallToActionButtonsProps> = ({
  introText = "Ready for the next step?",
  containerClassName = "mt-10 pt-6 border-t border-primary/10",
  showInvestButton = true,
  showAdvisorButton = true,
}) => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    // If we are already on the homepage, just scroll smoothly.
    if (window.location.pathname === '/') {
      document.getElementById('booking-contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on another page, navigate to the homepage first, then scroll.
      // A short timeout ensures the page has changed before we try to scroll.
      navigate('/');
      setTimeout(() => {
        document.getElementById('booking-contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className={`${containerClassName} text-center`}>
      {introText && <h4 className="text-lg font-semibold text-primary mb-4">{introText}</h4>}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {showInvestButton && (
          <a
            href="https://invest.sjcapital.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-gradient text-primary font-bold py-4 px-8 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 shadow-premium"
          >
            <TrendingUp className="w-5 h-5" />
            Start Investing
          </a>
        )}
        {showAdvisorButton && (
          <button
            onClick={handleContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border-2 border-accent text-accent font-bold py-4 px-8 rounded-xl hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Book Free Consultation
          </button>
        )}
      </div>
    </div>
  );
};

export default CallToActionButtons;