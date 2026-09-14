import React from 'react';
import { Helmet } from 'react-helmet-async';
import InvestHeader from '../components/invest/InvestHeader';
import ProspectForm from '../components/invest/ProspectForm';
import InvestFooter from '../components/invest/InvestFooter';

const InvestPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Tell us how we can help | SJ Capital Investaa</title>
        <meta
          name="description"
          content="Share your details and tell us what you'd like help with. We'll get in touch with you."
        />
        <link rel="canonical" href="https://www.sjcapital.in/invest" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tell us how we can help | SJ Capital Investaa" />
        <meta
          property="og:description"
          content="Share your details and tell us what you'd like help with. We'll get in touch with you."
        />
        <meta property="og:url" content="https://www.sjcapital.in/invest" />
        <meta property="og:site_name" content="SJ Capital Investaa" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tell us how we can help | SJ Capital Investaa" />
        <meta
          name="twitter:description"
          content="Share your details and tell us what you'd like help with. We'll get in touch with you."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-neutral-50/50 font-sans text-neutral-800 antialiased selection:bg-accent-200 selection:text-primary">
        <InvestHeader />

        <main className="flex-1 pt-24 sm:pt-28 pb-12 flex items-center justify-center">
          <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
            {/* Short, warm headline and supporting text */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
                Tell us how we can help.
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Share your details and tell us what you'd like help with. We'll get in touch with you.
              </p>
            </div>

            {/* Consultation Form */}
            <ProspectForm />
          </div>
        </main>

        <InvestFooter />
      </div>
    </>
  );
};

export default InvestPage;
