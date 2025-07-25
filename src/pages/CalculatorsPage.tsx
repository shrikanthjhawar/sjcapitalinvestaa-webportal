import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SipCalculator from '../components/calculator/SipCalculator';
import LumpsumCalculator from '../components/calculator/LumpsumCalculator';
import GoalSipCalculator from '../components/calculator/GoalSipCalculator';
import ChildEducationCalculator from '../components/calculator/ChildEducationCalculator';
import RetirementCalculator from '../components/calculator/RetirementCalculator';
import StepUpSipCalculator from '../components/calculator/StepUpSipCalculator';
import SwpCalculator from '../components/calculator/SwpCalculator';
import EmiCalculator from '../components/calculator/EmiCalculator';
import CalculatorDisclaimer from '../components/calculator/CalculatorDisclaimer';
import { Calculator } from 'lucide-react';

// This will hold all our calculators in the future
const calculators = [
  { id: 'sip', name: 'SIP Calculator', component: SipCalculator },
  { id: 'swp', name: 'SWP Calculator', component: SwpCalculator },
  { id: 'emi', name: 'EMI Calculator', component: EmiCalculator },
  { id: 'lumpsum', name: 'Lumpsum Calculator', component: LumpsumCalculator },
  { id: 'goal', name: 'Goal (SIP) Calculator', component: GoalSipCalculator },
  { id: 'child-education', name: 'Child Education Calculator', component: ChildEducationCalculator },
  { id: 'retirement', name: 'Retirement Calculator', component: RetirementCalculator },
  { id: 'step-up-sip', name: 'Step-up SIP', component: StepUpSipCalculator },
];

const CalculatorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sip');

  const activeCalculatorInfo = calculators.find(c => c.id === activeTab);
  const ActiveCalculatorComponent = activeCalculatorInfo ? activeCalculatorInfo.component : null;

  return (
    <>
      <Helmet>
        <title>Financial Calculators | SJ Capital Investaa</title>
        <meta name="description" content="Plan your investments with our easy-to-use financial calculators. Calculate SIP returns, and more to make informed financial decisions." />
        <link rel="canonical" href="https://www.sjcapital.in/calculators" />
        <meta property="og:title" content="Financial Calculators | SJ Capital Investaa" />
        <meta property="og:description" content="Plan your investments with our easy-to-use financial calculators." />
        <meta property="og:url" content="https://www.sjcapital.in/calculators" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Investment Calculators
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Tools to help you plan your financial future.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {calculators.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculator Content */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              {ActiveCalculatorComponent ? <ActiveCalculatorComponent /> : <div>Select a calculator</div>}
            </div>

            {/* Disclaimer */}
            <CalculatorDisclaimer />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CalculatorsPage;