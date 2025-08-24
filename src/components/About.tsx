import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Shield, Target, BarChart3, Clock, CheckCircle2, Phone } from 'lucide-react';

const About: React.FC = () => {


  const expertise = [
    {
      icon: TrendingUp,
      title: 'Systematic Investment Planning',
      description: 'Strategic SIP planning for consistent wealth creation and disciplined investing approach.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Portfolio Diversification',
      description: 'Risk-optimized fund selection across categories to balance returns and security.',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Target,
      title: 'Goal-Based Investing',
      description: 'Customized investment strategies tailored to your specific financial objectives.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Market Research & Analysis',
      description: 'In-depth market analysis and research-driven investment recommendations.',
      gradient: 'from-orange-500 to-red-500'
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Shield className="h-4 w-4" />
              About SJ Capital Investaa
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
              Your Trusted Partner in
              <span className="block bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 bg-clip-text text-transparent">
                Wealth Creation
              </span>
            </h2>
            <p className="font-body text-lg text-neutral-600 mb-6 leading-relaxed">
              We are dedicated to helping individuals and families build sustainable wealth through 
              strategic mutual fund investments. Our approach combines deep market knowledge with 
              personalized financial planning to ensure your investments align with your life goals.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-heading font-semibold text-primary mb-1">AMFI Registered Expertise</h4>
                  <p className="font-body text-sm text-neutral-600">ARN-337604 | Certified mutual fund distributor with regulatory compliance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-heading font-semibold text-primary mb-1">Goal-Oriented Planning</h4>
                  <p className="font-body text-sm text-neutral-600">Personalized investment strategies aligned with your specific objectives</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-heading font-semibold text-primary mb-1">Continuous Support</h4>
                  <p className="font-body text-sm text-neutral-600">Ongoing guidance and portfolio optimization for long-term success</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
              <h4 className="font-heading font-semibold text-primary mb-3">Ready to Start Your Investment Journey?</h4>
              <p className="font-body text-sm text-neutral-600 mb-4">
                Get personalized investment advice from our AMFI registered experts. 
                Book a free consultation to discuss your financial goals.
              </p>
              <a
                href="#booking-contact"
                className="inline-flex items-center gap-2 bg-accent-gradient text-primary px-6 py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105 shadow-premium"
              >
                <Phone className="h-4 w-4" />
                Book Free Consultation
              </a>
            </div>
          </motion.div>

          {/* Visual Element - Trust & Compliance */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-premium border border-neutral-200">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">Trust & Compliance</h3>
                  <p className="font-body text-sm text-neutral-600 mb-6">
                    Your investments are protected by regulatory compliance
                  </p>
                  
                  {/* Compliance Badges */}
                  <div className="space-y-4">
                    <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">AMFI Registration</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-lg font-bold text-primary">ARN-337604</div>
                      <div className="text-xs text-neutral-600">Certified Mutual Fund Distributor</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-700">SEBI Compliant</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-sm text-green-700">Regulatory compliance maintained</div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-700">Professional Standards</span>
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-sm text-blue-700">Ethical investment practices</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;