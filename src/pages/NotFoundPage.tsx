import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-white">
      <AlertTriangle className="w-16 h-16 text-accent mb-4" />
      <h1 className="text-4xl font-bold text-primary mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-primary/80 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-8 py-3 bg-accent text-primary rounded-lg font-bold hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;