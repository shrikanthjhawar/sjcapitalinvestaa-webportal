import React from 'react';
import { PiggyBank, TrendingUp, Shield, Target, Calculator, HeadphonesIcon } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: PiggyBank,
      title: 'Systematic Investment Plans',
      description: 'Start investing with as little as ₹500 per month through disciplined SIP approach.',
      features: ['Auto-debit facility', 'Flexible amount changes', 'Goal-based planning']
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Management',
      description: 'Professional fund selection and portfolio optimization for maximum returns.',
      features: ['Expert fund research', 'Risk assessment', 'Performance tracking']
    },
    {
      icon: Shield,
      title: 'Tax-Saving Funds',
      description: 'ELSS mutual funds offering tax benefits under Section 80C with growth potential.',
      features: ['₹1.5L tax deduction', '3-year lock-in', 'Equity exposure']
    },
    {
      icon: Target,
      title: 'Goal-Based Investing',
      description: 'Customized investment strategies for specific financial objectives.',
      features: ['Retirement planning', 'Child education', 'Home purchase']
    },
    {
      icon: Calculator,
      title: 'SIP Calculator',
      description: 'Advanced calculators to project your investment returns and plan effectively.',
      features: ['Future value estimation', 'Goal amount planning', 'Inflation adjustment']
    },
    {
      icon: HeadphonesIcon,
      title: 'Investment Advisory',
      description: 'Personalized investment advice from certified financial planners.',
      features: ['Regular reviews', 'Market updates', 'Rebalancing guidance']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-yellow-600 ml-2">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive mutual fund solutions designed to help you achieve your financial goals with confidence and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-900 to-yellow-600 p-3 rounded-lg w-fit mb-6">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-800 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h3>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied investors who have achieved their financial goals through our expert mutual fund advisory services.
          </p>
        {/*}  <a 
            href="https://demo.investwell.app/app/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            Get Started Today
          </a>*/}
        </div>
      </div>
    </section>
  );
};

export default Services;