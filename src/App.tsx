import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SIPCalculator from './components/SIPCalculator';
import BookingAndContact from './components/BookingAndContact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <SIPCalculator />
         <BookingAndContact />
      </main>
      <Footer />
    </div>
  );
}

export default App;