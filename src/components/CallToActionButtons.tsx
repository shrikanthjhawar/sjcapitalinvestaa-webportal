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
            href="/invest" // This can link to an external investment platform
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors transform hover:scale-105 shadow-md"
          >
            <TrendingUp className="w-5 h-5" />
            Invest Now
          </a>
        )}
        {showAdvisorButton && (
          <button
            onClick={handleContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-accent text-accent font-bold py-3 px-6 rounded-lg hover:bg-accent hover:text-primary transition-colors"
          >
            <Phone className="w-5 h-5" />
            Connect with an Advisor
          </button>
        )}
      </div>
    </div>
  );
};

export default CallToActionButtons;