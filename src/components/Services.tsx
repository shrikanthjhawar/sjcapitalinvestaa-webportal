import React from 'react';
import { PiggyBank, TrendingUp, Shield, Target, Calculator, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import CallToActionButtons from './CallToActionButtons';

const Services: React.FC = () => {
  const services = [
    {
      icon: PiggyBank,
      title: 'Systematic Investment Plans',
      description: 'Start your wealth journey with disciplined SIP investments from just ₹500 per month.',
      features: ['Auto-debit facility', 'Flexible amount changes', 'Goal-based planning'],
      highlight: 'Most Popular',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Management',
      description: 'Professional fund curation and optimization for superior long-term returns.',
      features: ['Expert fund research', 'Risk assessment', 'Performance tracking'],
      highlight: 'Premium',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Tax-Saving Funds',
      description: 'ELSS mutual funds combining tax benefits with wealth creation potential.',
      features: ['₹1.5L tax deduction', '3-year lock-in', 'Equity exposure'],
      highlight: 'Tax Saver',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Target,
      title: 'Goal-Based Investing',
      description: 'Customized investment strategies aligned with your specific life goals.',
      features: ['Retirement planning', 'Child education', 'Home purchase'],
      highlight: 'Personalized',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Calculator,
      title: 'Investment Calculators',
      description: 'Advanced planning tools to visualize and optimize your investment journey.',
      features: ['Future value estimation', 'Goal amount planning', 'Inflation adjustment'],
      highlight: 'Free Tools',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Advisory',
      description: 'Personalized guidance from certified financial planners and market experts.',
      features: ['Regular portfolio reviews', 'Market updates', 'Rebalancing guidance'],
      highlight: 'Expert Support',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Shield className="h-4 w-4" />
            Investment Solutions
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our Investment Services
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-neutral-200 hover:shadow-premium transition-all duration-300 active:scale-95 touch-manipulation"
            >
              <div className={`bg-gradient-to-r ${service.color} p-3 sm:p-4 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              
              <div className="mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 rounded-full px-2 py-1 sm:px-3 text-xs font-semibold mb-2 sm:mb-3">
                  {service.highlight}
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed mb-2 sm:mb-3">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-1 sm:space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-xs text-neutral-600">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-premium-gradient p-6 sm:p-8 rounded-3xl text-white text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-800/20"></div>
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-20 h-20 sm:w-24 sm:h-24 bg-accent/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 bg-primary-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Start Investing?
            </h3>
            <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              Get personalized investment advice from our AMFI registered experts.
            </p>
            <CallToActionButtons introText="" containerClassName="mt-0 pt-0 border-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;