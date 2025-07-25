import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component scrolls the window to the top of the page on every route change.
 * It uses the `useLocation` hook to detect changes in the URL's pathname.
 * Since it doesn't render any visible UI, it returns null.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // The effect runs every time the pathname changes

  return null;
};

export default ScrollToTop;