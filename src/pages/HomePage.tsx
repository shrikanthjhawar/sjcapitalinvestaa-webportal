import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedCalculators from '../components/FeaturedCalculators';
import BookingAndContact from '../components/BookingAndContact';


const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Services />
        <FeaturedCalculators />
        <BookingAndContact />
      </main>
     
    </>
  );
};

export default HomePage;