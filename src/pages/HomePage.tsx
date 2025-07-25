import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
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
        <BookingAndContact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;