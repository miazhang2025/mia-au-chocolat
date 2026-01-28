'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMenuAnimation } from '@/hooks/useMenuAnimation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { menuRef, openMenu, closeMenu } = useMenuAnimation();

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    closeMenu();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundImage: 'url(/nav.svg)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-x'
        }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ height: '80px' }}>
          {/* Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* Bakery Name */}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl md:text-3xl font-regular text-black font-bayon" style={{ letterSpacing: '5px' }}>
            MIA AU CHOCOLAT
          </h1>

          {/* Spacer for layout balance */}
          <div className="w-10"></div>
        </div>
      </nav>

      {/* Side Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full z-40 border-r border-neutral-300 shadow-2xl"
        style={{ width: '300px', transform: 'translateX(-100%)', backgroundColor: '#F9F8EB' }}
      >
        <div className="flex flex-col pt-24 px-8">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="py-4 text-lg text-black transition-colors border-b border-neutral-300 font-ibm-plex-mono"
            style={{ ['--hover-color' as string]: '#766700' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#766700'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={handleLinkClick}
            className="py-4 text-lg text-black transition-colors border-b border-neutral-300 font-ibm-plex-mono"
            onMouseEnter={(e) => e.currentTarget.style.color = '#766700'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            About
          </Link>
          <Link
            href="/pastries"
            onClick={handleLinkClick}
            className="py-4 text-lg text-black transition-colors border-b border-neutral-300 font-ibm-plex-mono"
            onMouseEnter={(e) => e.currentTarget.style.color = '#766700'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            All Pastries
          </Link>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="py-4 text-lg text-black transition-colors border-b border-neutral-300 font-ibm-plex-mono"
            onMouseEnter={(e) => e.currentTarget.style.color = '#766700'}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={handleMenuToggle}
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}
    </>
  );
}
