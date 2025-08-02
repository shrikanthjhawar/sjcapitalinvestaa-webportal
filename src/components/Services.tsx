import React from 'react';
import { PiggyBank, TrendingUp, Shield, Target, Calculator, HeadphonesIcon } from 'lucide-react';
import CallToActionButtons from './CallToActionButtons';

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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our
            <span className="text-accent ml-2">
              Services
            </span>
          </h2>
          <p className="text-xl text-primary/80 max-w-3xl mx-auto">
            Comprehensive mutual fund solutions designed to help you achieve your financial goals with confidence and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="bg-accent p-3 rounded-lg w-fit mb-6">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-primary/90 mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-primary/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-primary/70 max-w-4xl mx-auto">
            <p>
                <strong>Disclaimer:</strong> All investments are subject to market risks. The services and tools mentioned are for informational and planning purposes.
                We recommend consulting with a qualified financial advisor to understand the risks and make informed decisions based on your individual financial situation.
            </p>
        </div>

        <div className="mt-16 bg-primary p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied investors who have achieved their financial goals through our expert mutual fund advisory services.
          </p>
          <CallToActionButtons introText="" containerClassName="mt-0 pt-0 border-none" />
        </div>
      </div>
    </section>
  );
};

export default Services;