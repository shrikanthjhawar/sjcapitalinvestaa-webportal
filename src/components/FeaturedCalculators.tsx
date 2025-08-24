import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Goal, UserCheck, ShieldCheck, ArrowRight, Calculator, Sparkles } from 'lucide-react';

const featuredCalculators = [
  {
    title: 'SIP Calculator',
    description: 'Estimate the future value of your monthly investments with systematic planning.',
    link: '/calculators/sip',
    Icon: BarChart3,
    color: 'from-blue-500 to-cyan-500',
    popular: true
  },
  {
    title: 'Goal SIP Calculator',
    description: 'Plan your investments to achieve specific financial goals with precision.',
    link: '/calculators/goal-sip',
    Icon: Goal,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement and see how your savings can grow over time.',
    link: '/calculators/retirement',
    Icon: UserCheck,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Risk Profiler',
    description: 'Discover your investor profile to make informed investment decisions.',
    link: '/risk-profile',
    Icon: ShieldCheck,
    color: 'from-teal-500 to-cyan-500'
  },
];

const FeaturedCalculators: React.FC = () => {
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
    <section className="py-16 bg-gradient-to-br from-white via-neutral-50 to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <Calculator className="h-4 w-4" />
            Investment Planning Tools
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">
            Plan Your Financial Future
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {featuredCalculators.map((calc) => (
            <motion.div key={calc.title} variants={itemVariants}>
              <Link 
                to={calc.link} 
                className="group relative block bg-white p-8 rounded-3xl shadow-lg border border-neutral-200 hover:border-accent/30 hover:shadow-premium transition-all duration-500 transform hover:scale-105 overflow-hidden h-full"
              >
                {/* Popular Badge */}
                {calc.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-accent-500 to-accent-600 text-primary text-xs font-bold px-3 py-1 rounded-full">
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </div>
                  </div>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`bg-gradient-to-r ${calc.color} p-4 rounded-2xl w-fit mb-6 group-hover:shadow-lg transition-all duration-300`}>
                    <calc.Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-700 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">
                    {calc.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors mt-auto">
                    <span>Calculate Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-200 inline-block">
            <h3 className="text-2xl font-bold text-primary mb-4">Need More Tools?</h3>
            <p className="text-neutral-600 mb-6 max-w-md">
              Explore our complete suite of financial calculators for comprehensive planning.
            </p>
            <Link 
              to="/calculators" 
              className="inline-flex items-center gap-2 bg-accent-gradient text-primary px-8 py-4 rounded-2xl font-bold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              <Calculator className="h-5 w-5" />
              View All Calculators
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;