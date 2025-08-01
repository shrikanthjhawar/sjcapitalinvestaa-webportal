import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Goal, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

const featuredCalculators = [
  {
    title: 'SIP Calculator',
    description: 'Estimate the future value of your monthly investments.',
    link: '/calculators/sip',
    Icon: BarChart3,
  },
  {
    title: 'Goal SIP Calculator',
    description: 'Plan your investments to achieve a specific financial goal.',
    link: '/calculators/goal-sip',
    Icon: Goal,
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement and see how your savings can grow.',
    link: '/calculators/retirement',
    Icon: UserCheck,
  },
  {
    title: 'Risk Profiler',
    description: 'Discover your investor profile to make informed decisions.',
    link: '/risk-profile',
    Icon: ShieldCheck,
  },
];

const FeaturedCalculators: React.FC = () => {
  return (
    <section id="featured-calculators" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Financial Planning Tools
          </h2>
          <p className="text-xl text-primary/80 max-w-3xl mx-auto">
            Use our calculators to plan your investments and secure your financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCalculators.map((calc) => (
            <Link key={calc.title} to={calc.link} className="group block bg-white p-8 rounded-xl shadow-lg border border-primary/10 hover:border-accent transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-accent text-primary p-4 rounded-full w-fit mb-6">
                <calc.Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{calc.title}</h3>
              <p className="text-primary/90 mb-6 leading-relaxed flex-grow">{calc.description}</p>
              <p className="font-semibold text-accent flex items-center">
                Calculate Now <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/calculators" className="text-accent font-semibold hover:underline">
                View All Calculators &rarr;
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;