'use client';

import { Pastry } from '@/types/pastry';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface PastryCardProps {
  pastry: Pastry | null;
  onClose: () => void;
}

export default function PastryCard({ pastry, onClose }: PastryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  if (!pastry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/10"
      />

      {/* Card */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative rounded-2xl shadow-2xl flex flex-col" 
        style={{ 
          backgroundImage: 'url(/card.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: 'max(25vw, 400px)',
          height: 'calc(max(25vw, 400px) * 4.3 / 3)',
          maxHeight: '75vh',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-5 w-8 h-8 flex items-center justify-center bg-neutral-300 hover:bg-neutral-400 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Content - Center Aligned */}
        <div className="flex-1 p-6 flex flex-col items-center text-center overflow-hidden">
          {/* Image */}
          <div className="w-full max-w-md aspect-video rounded-lg mb-4 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
            <Image
              src={pastry.image}
              alt={pastry.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-black mb-2 flex-shrink-0 font-bayon">
            {pastry.name}
          </h2>

          {/* Description */}
          {/* <p className="text-black text-base mb-4 max-w-lg flex-shrink-0 font-ibm-plex-mono">
            {pastry.description}
          </p> */}

          {/* Recipe */}
          <div className="w-full max-w-lg flex-1 flex flex-col min-h-0">
            {/* <h3 className="text-lg font-semibold text-black mb-2 flex-shrink-0 font-bayon">
              Recipe
            </h3> */}
            <div className="text-center p-4 flex-1 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-black text-xs leading-relaxed font-ibm-plex-mono mb-[20px]">
                {pastry.recipe}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
