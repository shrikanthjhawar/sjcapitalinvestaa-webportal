import React from 'react';
import { Shield, TrendingUp, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-primary pt-24 pb-20 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Smart Investing,
            <span className="text-accent block mt-2">Simplified for You.</span>
          </h1>
          <p className="mt-6 text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Navigate your financial journey with our expert mutual fund advisory and personalized wealth management solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://invest.sjcapital.in" // TODO: Replace with your actual investment platform link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <TrendingUp className="h-5 w-5" />
              Invest Now
            </a>
            <button
              onClick={scrollToServices}
              className="border-2 border-accent/50 text-white px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300"
            >
              Explore Services
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-colors duration-300">
              <div className="bg-accent p-3 rounded-lg w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Investments</h3>
              <p className="text-white/70">SEBI registered and regulated platform ensuring your investments are safe and compliant.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-colors duration-300">
              <div className="bg-accent p-3 rounded-lg w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven Growth</h3>
              <p className="text-white/70">Track record of consistent returns with professionally managed mutual fund portfolios.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-colors duration-300">
              <div className="bg-accent p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Goal-Based Planning</h3>
              <p className="text-white/70">Customized investment strategies aligned with your financial objectives and timeline.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;