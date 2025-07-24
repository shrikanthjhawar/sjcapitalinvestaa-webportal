import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import SIPCalculator from '../components/SIPCalculator';
import BookingAndContact from '../components/BookingAndContact';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <SIPCalculator />
        <BookingAndContact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;