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
        <title>SJ Capital Investaa - Premium Mutual Fund Advisory & Wealth Management</title>
        <meta name="description" content="Transform your financial future with SJ Capital Investaa's premium mutual fund advisory services. Expert guidance, personalized strategies, and proven results for wealth creation." />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="keywords" content="mutual fund advisor, SIP planning, wealth management, investment advisory, financial planning, SEBI registered, mutual funds India" />
        <meta name="author" content="SJ Capital Investaa" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Social Media Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SJ Capital Investaa - Premium Mutual Fund Advisory" />
        <meta property="og:description" content="Expert mutual fund advisory and wealth management services. Start your investment journey with confidence." />
        <meta property="og:url" content="https://www.sjcapital.in" />
        <meta property="og:site_name" content="SJ Capital Investaa" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SJ Capital Investaa - Premium Mutual Fund Advisory" />
        <meta name="twitter:description" content="Expert mutual fund advisory and wealth management services." />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#1e1b4b" />
        <meta name="msapplication-navbutton-color" content="#1e1b4b" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preload Critical Fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" as="style" />
      </Helmet>
      
      <div className="flex min-h-screen flex-col bg-white antialiased">
        <Header />
        <main className="flex-1 relative">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;