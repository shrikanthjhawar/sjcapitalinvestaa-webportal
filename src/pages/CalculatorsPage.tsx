import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Landmark, UserCheck, Wallet, ShieldCheck, GraduationCap, Package, Goal, PiggyBank } from 'lucide-react';

const calculatorList = [
  {
    title: 'SIP Calculator',
    description: 'Estimate the future value of your monthly investments with SIPs.',
    link: '/calculators/sip',
    Icon: BarChart3,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
    {
    title: 'SWP Calculator',
    description: 'Plan your Systematic Withdrawal Plan for a regular income stream.',
    link: '/calculators/swp',
    Icon: Wallet,
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'Lumpsum Calculator',
    description: 'Calculate the future value of a one-time lumpsum investment.',
    link: '/calculators/lumpsum',
    Icon: Package,
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'FD/RD Calculator',
    description: 'Calculate returns for Fixed and Recurring Deposits.',
    link: '/calculators/fd-rd',
    Icon: PiggyBank,
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    title: 'Goal SIP Calculator',
    description: 'Plan your investments to achieve a specific financial goal.',
    link: '/calculators/goal-sip',
    Icon: Goal,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Child Education Calculator',
    description: "Plan for your child's future education expenses.",
    link: '/calculators/child-education',
    Icon: GraduationCap,
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for loans.',
    link: '/calculators/emi',
    Icon: Landmark,
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement and see how your savings can grow over time.',
    link: '/calculators/retirement',
    Icon: UserCheck,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },

  {
    title: 'Risk Profiler',
    description: 'Discover your investor profile to make informed investment decisions.',
    link: '/risk-profile',
    Icon: ShieldCheck,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
  },
];

const CalculatorsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Financial Calculators
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Empower your financial decisions with our suite of powerful and easy-to-use calculators.
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {calculatorList.map((calculator) => (
            <Link key={calculator.title} to={calculator.link} className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${calculator.bgColor}`}><calculator.Icon className={`h-6 w-6 ${calculator.iconColor}`} aria-hidden="true" /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{calculator.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{calculator.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;