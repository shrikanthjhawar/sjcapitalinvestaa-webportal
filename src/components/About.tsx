import React from 'react';
import { Users, BarChart3, Clock, Award } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Clients' },
    { icon: BarChart3, value: '₹500Cr+', label: 'Assets Under Management' },
    { icon: Clock, value: '15+', label: 'Years Experience' },
    { icon: Award, value: '50+', label: 'Awards Won' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-600 ml-2">
              SJ Capital Investaa
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to helping you achieve your financial goals through strategic mutual fund investments and personalized wealth management solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At SJ Capital Investaa, we believe that everyone deserves access to professional investment management. 
              Our mission is to democratize wealth creation by providing expert mutual fund advisory services that 
              help our clients build long-term financial security.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              With over 15 years of experience in the financial markets, our team combines deep market knowledge 
              with innovative technology to deliver superior investment outcomes for our clients.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-6">Our Expertise</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-400 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Systematic Investment Planning</h4>
                  <p className="text-blue-200 text-sm">Strategic SIP planning for consistent wealth creation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-400 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Portfolio Diversification</h4>
                  <p className="text-blue-200 text-sm">Risk-optimized fund selection across categories</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-400 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Goal-Based Investing</h4>
                  <p className="text-blue-200 text-sm">Customized strategies for specific financial objectives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-400 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Market Research</h4>
                  <p className="text-blue-200 text-sm">In-depth analysis and market insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
    
        </div>
      </div>
    </section>
  );
};

export default About;