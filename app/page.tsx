'use client';

import { useState } from 'react';
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