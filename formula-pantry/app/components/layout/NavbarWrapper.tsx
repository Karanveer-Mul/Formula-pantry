'use client';

import { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavbar';
import PCNavbar from './PCNavbar';

export default function NavbarWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <MobileNavbar />
      <PCNavbar />
    </>
  );
}