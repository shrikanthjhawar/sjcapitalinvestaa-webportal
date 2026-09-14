import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Zap, TrendingUp, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { LarkLoanModal } from '../components/LarkLoanModal';
import { DEFAULT_LARK_WHITE_LABEL_URL } from '../services/larkLoanService';

export const LoanPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: 'Instant Sanction',
      description: 'Check loan eligibility and receive approval in minutes without physical paperwork.',
    },
    {
      icon: TrendingUp,
      title: 'Keep Investments Intact',
      description: 'Never sell your mutual funds or shares. Continue earning market returns while accessing liquidity.',
    },
    {
      icon: Shield,
      title: 'Attractive Interest Rates',
      description: 'Pay interest only on the amount utilized, starting from competitive annual interest rates.',
    },
  ];

  const eligibleSecurities = [
    'Equity & Hybrid Mutual Funds',
    'Approved Equity Shares & Stocks',
    'Debt Mutual Funds & Bonds',
    'Government & Sovereign Gold Bonds',
  ];

  return (
    <>
      <Helmet>
        <title>Loan Against Securities & Mutual Funds – SJ Capital Investaa</title>
        <meta
          name="description"
          content="Get instant liquidity against your mutual funds and securities without selling your portfolio. Low interest rates and 100% digital process."
        />
      </Helmet>

      <div className="bg-slate-900 text-white min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Banner */}
          <div className="text-center space-y-6 max-w-3xl mx-auto pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-xs font-semibold uppercase tracking-wider">
              Powered by Lark Finserv
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Instant <span className="text-accent-400">Loan Against Securities</span> & Mutual Funds
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
              Unlock emergency capital from your investment portfolio without sacrificing long-term compound growth.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-slate-950 font-bold shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Check Eligibility Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={DEFAULT_LARK_WHITE_LABEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Open Direct Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm space-y-4 hover:border-accent-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Eligible Securities */}
          <div className="bg-slate-800/40 rounded-3xl border border-slate-700 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-heading text-white">Eligible Collateral</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Pledge your existing investments digitally with top approved CAMS & KFintech mutual funds and demat holdings.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-accent-500 text-slate-950 font-bold text-sm hover:bg-accent-400 transition-colors"
                >
                  Start Digital Pledge
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {eligibleSecurities.map((sec, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 text-sm font-medium">
                  <CheckCircle className="w-5 h-5 text-accent-400 flex-shrink-0" />
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lark Eligibility Modal */}
      <LarkLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LoanPage;
