
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMobileNav } from '@/hooks/use-mobile-nav';

export function useMobileNavigation() {
  const location = useLocation();
  const mobileNav = useMobileNav();

  useEffect(() => {
    mobileNav.close();
  }, [location.pathname, mobileNav]);

  return mobileNav;
}
