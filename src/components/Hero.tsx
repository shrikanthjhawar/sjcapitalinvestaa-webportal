import React from 'react';
import { ArrowRight, Shield, TrendingUp, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-16 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Path to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 block">
              Financial Freedom
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert mutual fund investment solutions tailored to your financial goals. 
            Start your SIP journey with SJ Capital Investaa and watch your wealth grow systematically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToCalculator}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Calculate Your SIP
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-200">
              Learn More
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-blue-800/50 p-6 rounded-xl border border-blue-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
              <div className="bg-yellow-400 p-3 rounded-lg w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Investments</h3>
              <p className="text-blue-200">SEBI registered and regulated platform ensuring your investments are safe and compliant.</p>
            </div>

            <div className="bg-blue-800/50 p-6 rounded-xl border border-blue-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
              <div className="bg-yellow-400 p-3 rounded-lg w-fit mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven Growth</h3>
              <p className="text-blue-200">Track record of consistent returns with professionally managed mutual fund portfolios.</p>
            </div>

            <div className="bg-blue-800/50 p-6 rounded-xl border border-blue-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
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