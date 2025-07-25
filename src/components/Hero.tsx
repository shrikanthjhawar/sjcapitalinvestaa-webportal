import React from 'react';
import { Shield, TrendingUp, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-24 pb-20 bg-blue-900 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Smart Investing,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 block mt-2">
              Simplified for You.
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Navigate your financial journey with our expert mutual fund advisory and personalized wealth management solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://invest.sjcapital.in" // TODO: Replace with your actual investment platform link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <TrendingUp className="h-5 w-5" />
              Invest Now
            </a>
            <button
              onClick={scrollToServices}
              className="border-2 border-blue-600 bg-blue-800/50 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 hover:border-blue-500 transition-all duration-300"
            >
              Explore Services
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-800/40 p-6 rounded-xl border border-blue-700/50 hover:border-yellow-400 transition-colors duration-300">
              <div className="bg-yellow-400 p-3 rounded-lg w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Investments</h3>
              <p className="text-blue-200">SEBI registered and regulated platform ensuring your investments are safe and compliant.</p>
            </div>

            <div className="bg-blue-800/40 p-6 rounded-xl border border-blue-700/50 hover:border-yellow-400 transition-colors duration-300">
              <div className="bg-yellow-400 p-3 rounded-lg w-fit mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven Growth</h3>
              <p className="text-blue-200">Track record of consistent returns with professionally managed mutual fund portfolios.</p>
            </div>

            <div className="bg-blue-800/40 p-6 rounded-xl border border-blue-700/50 hover:border-yellow-400 transition-colors duration-300">
              <div className="bg-yellow-400 p-3 rounded-lg w-fit mx-auto mb-4">
                <Target className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Goal-Based Planning</h3>
              <p className="text-blue-200">Customized investment strategies aligned with your financial objectives and timeline.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;