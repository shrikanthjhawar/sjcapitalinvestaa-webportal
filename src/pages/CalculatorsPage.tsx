import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Landmark, UserCheck, Wallet, ShieldCheck, GraduationCap, Package, Goal, PiggyBank, Calculator, ArrowRight } from 'lucide-react';

const calculatorList = [
  {
    title: 'SIP Calculator',
    description: 'Estimate the future value of your monthly investments with SIPs.',
    link: '/calculators/sip',
    Icon: BarChart3,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Goal SIP Calculator',
    description: 'Plan your investments to achieve a specific financial goal.',
    link: '/calculators/goal-sip',
    Icon: Goal,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Lumpsum Calculator',
    description: 'Calculate the future value of a one-time lumpsum investment.',
    link: '/calculators/lumpsum',
    Icon: Package,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'SWP Calculator',
    description: 'Plan your Systematic Withdrawal Plan for a regular income stream.',
    link: '/calculators/swp',
    Icon: Wallet,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement and see how your savings can grow over time.',
    link: '/calculators/retirement',
    Icon: UserCheck,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Child Education Calculator',
    description: "Plan for your child's future education expenses.",
    link: '/calculators/child-education',
    Icon: GraduationCap,
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'FD/RD Calculator',
    description: 'Calculate returns for Fixed and Recurring Deposits.',
    link: '/calculators/fd-rd',
    Icon: PiggyBank,
    color: 'from-emerald-500 to-green-500'
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for loans.',
    link: '/calculators/emi',
    Icon: Landmark,
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Risk Profiler',
    description: 'Discover your investor profile to make informed investment decisions.',
    link: '/risk-profile',
    Icon: ShieldCheck,
    color: 'from-teal-500 to-cyan-500'
  },
];

const CalculatorsPage: React.FC = () => {
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
    <div className="bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Calculator Grid - Mobile Optimized */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {calculatorList.map((calc, index) => (
            <motion.div key={calc.title} variants={itemVariants}>
              <Link 
                to={calc.link} 
                className="group relative block bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg border border-neutral-200 hover:border-accent/30 hover:shadow-premium transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden h-full touch-manipulation"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${calc.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`bg-gradient-to-r ${calc.color} p-3 sm:p-4 rounded-2xl w-fit mb-4 sm:mb-6 group-hover:shadow-lg transition-all duration-300`}>
                    <calc.Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-primary-700 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                    {calc.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors mt-auto text-sm sm:text-base">
                    <span>Calculate Now</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 text-center bg-premium-gradient rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Need Personalized Advice?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Our calculators are just the beginning. Get expert guidance tailored to your unique financial situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/risk-profile"
              className="bg-accent hover:bg-accent-600 text-primary px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Take Risk Assessment
            </Link>
            <button 
              onClick={() => document.getElementById('booking-contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
            >
              Book Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorsPage;