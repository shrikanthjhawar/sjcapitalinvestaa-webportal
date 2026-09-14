import React from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '/images/logo_updated_FINAL_SVG.svg';

const InvestHeader: React.FC = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center" title="SJ Capital Investaa Home">
            <img
              src={fullLogo}
              alt="SJ Capital Investaa Logo"
              className="h-14 sm:h-18 w-auto"
            />
          </Link>

          {/* AMFI Registration */}
          <div className="text-right text-neutral-600">
            <p className="text-[11px] sm:text-xs font-semibold text-primary">
              AMFI Registered Mutual Fund Distributor
            </p>
            <p className="text-[10px] sm:text-xs text-neutral-500 font-mono">ARN-337604</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InvestHeader;
