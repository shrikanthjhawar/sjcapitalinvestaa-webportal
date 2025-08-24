import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RiskProfileForm from '../components/RiskProfileForm';

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Investor Risk Profile Assessment",
  "description": "Discover your investor profile and get personalized investment insights",
  "author": {
    "@type": "Organization",
    "name": "SJ Capital Investaa"
  }
};

const RiskProfilePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Risk Profile Assessment | SJ Capital Investaa</title>
        <meta name="description" content="Discover your investor profile by answering a few simple questions. Understand your risk tolerance and get personalized investment insights." />
        <link rel="canonical" href="https://www.sjcapital.in/risk-profile" />
        <meta property="og:title" content="Risk Profile Assessment | SJ Capital Investaa" />
        <meta property="og:description" content="Discover your investor profile and get personalized investment insights." />
        <meta property="og:url" content="https://www.sjcapital.in/risk-profile" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(quizSchema)}
        </script>
      </Helmet>
      
      <main className="pt-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen">
        {/* Main Content - Mobile Optimized */}
        <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RiskProfileForm />
          </motion.div>
        </div>

        {/* Bottom CTA Section - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-20 text-center bg-premium-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white mx-4 sm:mx-8"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Your Investment Strategy?</h3>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Complete your risk profile to receive personalized investment recommendations tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('booking-contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent hover:bg-accent-600 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg touch-manipulation"
            >
              Book Free Consultation
            </button>
            <Link 
              to="/calculators"
              className="border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 active:scale-95 touch-manipulation"
            >
              Explore Calculators
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default RiskProfilePage;