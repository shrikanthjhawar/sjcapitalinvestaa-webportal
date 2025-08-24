import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Calculator, BookOpen } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const quickLinks = [
    { name: 'Home', path: '/', icon: Home, description: 'Return to homepage' },
    { name: 'Calculators', path: '/calculators', icon: Calculator, description: 'Financial planning tools' },
    { name: 'Blogs', path: '/blogs', icon: BookOpen, description: 'Investment insights' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/30 flex items-center justify-center px-4 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-accent-gradient mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have taken an unexpected investment detour. 
              Don't worry, we'll help you get back on track!
            </p>
          </div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-200 max-w-md mx-auto">
              <Search className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Looking for something specific?</h3>
              <p className="text-neutral-600 text-sm">
                Try searching our calculators, blog posts, or return to the homepage to explore our services.
              </p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-primary mb-8">Quick Navigation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="group block bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 hover:border-accent/30 hover:shadow-premium transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="bg-gradient-to-br from-accent-400 to-accent-600 p-3 rounded-xl w-fit mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {link.name}
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      {link.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-accent-gradient text-primary px-10 py-4 rounded-2xl font-bold hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Return to Homepage
            </Link>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-500 text-sm">
              Need help? Contact our support team at{' '}
              <a href="mailto:shrikanth@sjcapital.in" className="text-accent hover:underline font-medium">
                shrikanth@sjcapital.in
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;