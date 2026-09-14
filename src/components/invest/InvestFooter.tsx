import React from 'react';
import { Link } from 'react-router-dom';

const InvestFooter: React.FC = () => {
  return (
    <footer className="bg-primary-950 text-white border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
        {/* AMFI & Registration */}
        <p className="text-xs font-semibold text-accent mb-1">
          AMFI Registered Mutual Fund Distributor
        </p>
        <p className="text-xs text-neutral-400 font-mono mb-4">ARN-337604</p>

        {/* Links & Copyright */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-neutral-400 mb-6">
          <p>© {new Date().getFullYear()} SJ Capital Investaa. All rights reserved.</p>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">
            Privacy Policy
          </Link>
          <span className="text-neutral-600">•</span>
          <Link to="/terms-of-service" className="hover:text-accent transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Mandatory SEBI / AMFI Risk Disclaimer */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-[11px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            <strong className="text-neutral-300">Disclaimer:</strong> Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default InvestFooter;
