'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import PastryCard from '@/components/PastryCard';
import BackgroundMusic from '@/components/BackgroundMusic';
import MusicPlayer from '@/components/MusicPlayer';
import ClickParticles from '@/components/ClickParticles';
import { pastries } from '@/data/pastries';
import { Pastry } from '@/types/pastry';

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  const [selectedPastry, setSelectedPastry] = useState<Pastry | null>(null);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Scroll to top on page load and handle scroll to hide hint
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollHint(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePastryClick = (pastry: Pastry, event?: MouseEvent) => {
    setSelectedPastry(pastry);
    
    // Capture click position for particles
    if (event) {
      setClickPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleCloseCard = () => {
    setSelectedPastry(null);
  };

  const handleParticlesComplete = () => {
    setClickPosition(null);
  };

  const handleOpenMusicPlayer = () => {
    setIsMusicPlayerOpen(true);
  };

  const handleCloseMusicPlayer = () => {
    setIsMusicPlayerOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Navbar */}
      <Navbar onMusicClick={handleOpenMusicPlayer} />

      {/* 3D Scene - fixed background */}
      <div className="fixed inset-0 z-0">
        <Scene pastries={pastries} onPastryClick={handlePastryClick} />
      </div>

      {/* Scrollable content to enable scroll-based zoom */}
      <div className="relative z-10 pointer-events-none">
        {/* Spacer to create scroll height (adjust height as needed) */}
        <div style={{ height: '300vh' }}></div>
      </div>

      {/* Scroll to Explore Hint */}
      <div 
        className={`fixed bottom-40 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-1000 ${
          showScrollHint ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          animation: showScrollHint ? 'fadeInPulse 3s ease-in-out infinite' : 'none'
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-1xl font-regular text-white drop-shadow-lg font-ibm-plex-mono tracking-wide">
            - Scroll to Explore -
          </p>
        </div>
      </div>

      {/* v>

      {/* Scrollable content to enable scroll-based zoom */}
      <div className="relative z-10 pointer-events-none">
        {/* Spacer to create scroll height (adjust height as needed) */}
        <div style={{ height: '300vh' }}></div>
      </div>

      {/* Pastry Detail Card */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <PastryCard pastry={selectedPastry} onClose={handleCloseCard} />
        </div>
      </div>

      {/* Music Player Floating Card */}
      <MusicPlayer isOpen={isMusicPlayerOpen} onClose={handleCloseMusicPlayer} />

      {/* Click Particles */}
      <ClickParticles clickPosition={clickPosition} onAnimationComplete={handleParticlesComplete} />

      {/* Background Music */}
      <BackgroundMusic src="/Aves - Winter Magic.mp3" volume={0.3} />
    </div>
  );
}


