'use client';

import { useRef, RefObject } from 'react';
import gsap from 'gsap';

interface UseMenuAnimationReturn {
  menuRef: RefObject<HTMLDivElement>;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMenuAnimation = (): UseMenuAnimationReturn => {
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  };

  const closeMenu = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  };

  return { menuRef, openMenu, closeMenu };
};
