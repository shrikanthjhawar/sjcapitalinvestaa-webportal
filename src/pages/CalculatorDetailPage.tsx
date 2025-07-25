import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

import SipCalculator from '../components/calculator/SipCalculator';
import LumpsumCalculator from '../components/calculator/LumpsumCalculator';
import GoalSipCalculator from '../components/calculator/GoalSipCalculator';
import ChildEducationCalculator from '../components/calculator/ChildEducationCalculator';
import RetirementCalculator from '../components/calculator/RetirementCalculator';
import StepUpSipCalculator from '../components/calculator/StepUpSipCalculator';
import SwpCalculator from '../components/calculator/SwpCalculator';
import EmiCalculator from '../components/calculator/EmiCalculator';
import CalculatorDisclaimer from '../components/calculator/CalculatorDisclaimer';
import NotFoundPage from './NotFoundPage';

// A map to link URL slugs to calculator components and their metadata.
const calculatorMap = {
  'sip': {
    name: 'SIP Calculator',
    component: SipCalculator,
    description: 'Estimate the future value of your monthly investments with our SIP calculator.'
  },
  'lumpsum': {
    name: 'Lumpsum Calculator',
    component: LumpsumCalculator,
    description: 'Calculate the future value of a one-time lumpsum investment.'
  },
  'step-up-sip': {
    name: 'Step-up SIP Calculator',
    component: StepUpSipCalculator,
    description: 'Calculate returns for SIPs with periodic (annual) top-ups.'
  },
  'goal-sip': {
    name: 'Goal SIP Calculator',
    component: GoalSipCalculator,
    description: 'Plan your investments to achieve a specific financial goal.'
  },
  'child-education': {
    name: 'Child Education Calculator',
    component: ChildEducationCalculator,
    description: "Plan for your child's future education expenses."
  },
  'emi': {
    name: 'EMI Calculator',
    component: EmiCalculator,
    description: 'Calculate your Equated Monthly Installment (EMI) for loans.'
  },
  'retirement': {
    name: 'Retirement Calculator',
    component: RetirementCalculator,
    description: 'Plan your retirement and see how your savings can grow over time.'
  },
  'swp': {
    name: 'SWP Calculator',
    component: SwpCalculator,
    description: 'Plan your Systematic Withdrawal Plan for a regular income stream.'
  },
};

const CalculatorDetailPage: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();

  // Handle case where calculatorId is not provided or invalid
  if (!calculatorId || !calculatorMap[calculatorId as keyof typeof calculatorMap]) {
    return <NotFoundPage />;
  }

  const calculator = calculatorMap[calculatorId as keyof typeof calculatorMap];
  const ActiveCalculatorComponent = calculator.component;

  return (
    <>
      <Helmet>
        <title>{`${calculator.name} | SJ Capital Investaa`}</title>
        <meta name="description" content={calculator.description} />
        <link rel="canonical" href={`https://www.sjcapital.in/calculators/${calculatorId}`} />
      </Helmet>
      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Link to="/calculators" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Calculators
              </Link>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">{calculator.name}</h1>
              <ActiveCalculatorComponent />
            </div>
            <CalculatorDisclaimer />
          </div>
        </div>
      </main>
    </>
  );
};

export default CalculatorDetailPage;