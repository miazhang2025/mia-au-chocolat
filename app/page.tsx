'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import PastryCard from '@/components/PastryCard';
import BackgroundMusic from '@/components/BackgroundMusic';
import MusicPlayer from '@/components/MusicPlayer';
import { pastries } from '@/data/pastries';
import { Pastry } from '@/types/pastry';

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  const [selectedPastry, setSelectedPastry] = useState<Pastry | null>(null);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePastryClick = (pastry: Pastry) => {
    setSelectedPastry(pastry);
  };

  const handleCloseCard = () => {
    setSelectedPastry(null);
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

      {/* Pastry Detail Card */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <PastryCard pastry={selectedPastry} onClose={handleCloseCard} />
        </div>
      </div>

      {/* Music Player Floating Card */}
      <MusicPlayer isOpen={isMusicPlayerOpen} onClose={handleCloseMusicPlayer} />

      {/* Background Music */}
      <BackgroundMusic src="/Aves - Winter Magic.mp3" volume={0.3} />
    </div>
  );
}


