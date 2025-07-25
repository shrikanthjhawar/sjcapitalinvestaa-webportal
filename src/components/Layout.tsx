import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <>
      <Helmet>
        {/* Viewport is now managed here globally */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* 
          Set default metadata here. 
          Page-specific components can override these with their own Helmet tags.
        */}
        <title>SJ Capital Investaa - Your Partner in Wealth Creation</title>
        <meta name="description" content="SJ Capital Investaa offers expert mutual fund distribution and financial planning services in India. Grow your wealth with our tailored investment solutions." />
      </Helmet>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{/* The Outlet renders the current page */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;