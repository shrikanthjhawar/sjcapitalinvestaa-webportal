import React from 'react';
import { Shield, TrendingUp, Target, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="hero" className="relative bg-premium-gradient min-h-screen flex items-center text-white overflow-hidden">
      {/* Subtle Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-primary-800/10"></div>
      <div className="absolute top-16 left-8 w-32 h-32 sm:top-32 sm:left-16 sm:w-64 sm:h-64 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 right-8 w-40 h-40 sm:bottom-32 sm:right-16 sm:w-80 sm:h-80 bg-primary-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          {/* Refined Badge - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 sm:px-5 text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-white/90 text-xs sm:text-sm">AMFI Registered Mutual Fund Distributor</span>
            </div>
          </motion.div>

          {/* Refined Headline - Mobile Optimized */}
          <motion.h1 
            {...fadeInUp}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight"
          >
            Wealth Management
            <span className="block bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent mt-1">
              Simplified & Personalized
            </span>
          </motion.h1>
          
          {/* Refined Subheading - Mobile Optimized */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Professional mutual fund advisory with personalized strategies 
            to grow your wealth systematically.
          </motion.p>
          
          {/* Single Premium CTA - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 sm:mb-16"
          >
            <a
              href="https://invest.sjcapital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-accent-gradient text-primary px-6 py-4 sm:px-8 sm:py-4 rounded-xl font-semibold hover:shadow-glow active:scale-95 transition-all duration-300 transform hover:scale-105 shadow-premium touch-manipulation"
            >
              <span className="text-sm sm:text-base">Start Your Investment Journey</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Refined Feature highlights - Mobile Optimized */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeInUp}
              className="group bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 active:scale-95 touch-manipulation"
            >
              <div className="bg-accent/20 p-2 sm:p-3 rounded-lg w-fit mx-auto mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2">AMFI Registered</h3>
              <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed">ARN-337604 | Certified mutual fund distributor</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="group bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 active:scale-95 touch-manipulation"
            >
              <div className="bg-accent/20 p-2 sm:p-3 rounded-lg w-fit mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2">Proven Track Record</h3>
              <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed">15+ years of successful wealth management</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="group bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-300 active:scale-95 touch-manipulation sm:col-span-2 lg:col-span-1"
            >
              <div className="bg-accent/20 p-2 sm:p-3 rounded-lg w-fit mx-auto mb-3 sm:mb-4">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2">Goal-Based Planning</h3>
              <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed">Personalized strategies for your objectives</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;