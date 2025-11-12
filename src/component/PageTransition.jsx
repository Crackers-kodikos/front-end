import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Simple transition wrapper for two auth pages (login / signup).
// Direction inverted: when navigating to /signup the form will slide in from the LEFT (slide-right)
// and when navigating to /login the form will slide in from the RIGHT (slide-left).
// This is a lightweight, CSS-driven animation (no extra deps).
export default function PageTransition({ children }) {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    const prev = prevPathRef.current;
    const next = location.pathname;

    if (next === '/signup' && prev === '/login') {
      setDirection('to-signup');
    } else if (next === '/login' && prev === '/signup') {
      setDirection('to-login');
    } else {
      // For other movements, clear animation
      setDirection('');
    }

    prevPathRef.current = next;
  }, [location.pathname]);

  // Invert mapping so signup uses slide-right (enters from left) and login uses slide-left (enters from right)
  const className =
    direction === 'to-signup' ? 'page-transition slide-right' : direction === 'to-login' ? 'page-transition slide-left' : 'page-transition';

  // key on location.pathname forces remount so animation runs each navigation
  return (
    <div className={className} key={location.pathname}>
      {children}
    </div>
  );
}
