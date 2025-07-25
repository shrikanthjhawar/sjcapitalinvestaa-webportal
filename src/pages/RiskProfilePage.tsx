import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RiskProfileForm from '../components/RiskProfileForm';

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
      </Helmet>
      <Header />
      <main className="pt-16">
        <RiskProfileForm />
      </main>
      <Footer />
    </>
  );
};

export default RiskProfilePage;