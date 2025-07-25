import React from 'react';
import { Helmet } from 'react-helmet-async';
import RiskProfileForm from '../components/RiskProfileForm';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is an investor risk profile?',
    answer: 'An investor risk profile is a comprehensive assessment of your willingness and ability to take financial risks. It considers factors like your investment goals, time horizon, and psychological comfort with market volatility to categorize you as conservative, moderate, or aggressive.',
  },
  {
    question: 'Why is knowing my risk profile important?',
    answer: 'Knowing your risk profile is crucial for making informed investment decisions. It helps you choose investment products that align with your risk tolerance, preventing you from taking on too much risk (which can lead to panic selling) or too little risk (which may not help you achieve your goals).',
  },
  {
    question: 'How often should I reassess my risk profile?',
    answer: 'It is recommended to reassess your risk profile annually or whenever you experience a significant life event, such as a change in income, marriage, or nearing retirement. This ensures your investment strategy remains aligned with your current financial situation and goals.',
  },
  {
    question: 'Is this risk assessment financial advice?',
    answer: 'No, this risk profiler is an informational tool designed to provide a general understanding of your risk tolerance. The results do not constitute financial advice. We strongly recommend consulting with a certified financial advisor to create a personalized investment plan.',
  },
];

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Investor Risk Profile Assessment",
  "description": "Determine your investment risk tolerance with this quiz to get personalized financial insights.",
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
        <script type="application/ld+json">{JSON.stringify(quizSchema)}</script>
      </Helmet>
      <main className="pt-20 bg-gray-50">
        {/* Introduction Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Understand Your Investment Risk Profile
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              A crucial first step towards smart investing. This short quiz helps align your portfolio with your financial personality.
            </p>
          </div>
        </div>

        <RiskProfileForm />

        {/* FAQ Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-10">
                {faqs.map((faq, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white">
                        <HelpCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <dt className="text-lg font-semibold text-gray-900">{faq.question}</dt>
                      <dd className="mt-2 text-base text-gray-600">{faq.answer}</dd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RiskProfilePage;