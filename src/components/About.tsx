import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Why Choose 
            <span className="text-accent ml-2">
              SJ Capital Investaa
            </span>
          </h2>
          <p className="text-xl text-primary/80 max-w-3xl mx-auto">
            We are committed to helping you achieve your financial goals through strategic mutual fund investments and personalized wealth management solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Our Mission</h3>
            <p className="text-primary/90 mb-6 leading-relaxed">
              At SJ Capital Investaa, we believe that everyone deserves access to professional investment management. 
              Our mission is to democratize wealth creation by providing expert mutual fund advisory services that 
              help our clients build long-term financial security.
            </p>
          </div>

          <div className="bg-primary p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-6">Our Expertise</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent p-1 rounded-full mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Systematic Investment Planning</h4>
                  <p className="text-white/70 text-sm">Strategic SIP planning for consistent wealth creation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-accent p-1 rounded-full mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Portfolio Diversification</h4>
                  <p className="text-white/70 text-sm">Risk-optimized fund selection across categories</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-accent p-1 rounded-full mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Goal-Based Investing</h4>
                  <p className="text-white/70 text-sm">Customized strategies for specific financial objectives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-accent p-1 rounded-full mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Market Research</h4>
                  <p className="text-white/70 text-sm">In-depth analysis and market insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;