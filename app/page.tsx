'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import PastryCard from '@/components/PastryCard';
import { pastries } from '@/data/pastries';
import { Pastry } from '@/types/pastry';

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  const [selectedPastry, setSelectedPastry] = useState<Pastry | null>(null);

  const handlePastryClick = (pastry: Pastry) => {
    setSelectedPastry(pastry);
  };

  const handleCloseCard = () => {
    setSelectedPastry(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* 3D Scene */}
      <Scene pastries={pastries} onPastryClick={handlePastryClick} />

      {/* Pastry Detail Card */}
      <PastryCard pastry={selectedPastry} onClose={handleCloseCard} />
    </div>
  );
}
