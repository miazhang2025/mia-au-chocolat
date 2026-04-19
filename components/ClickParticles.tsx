'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle';
  size: number;
  color: string;
  opacity: number;
  life: number;
}

interface ClickParticlesProps {
  clickPosition: { x: number; y: number } | null;
  onAnimationComplete: () => void;
}

const COLORS = ['#ffffff', '#5C9C7F'];
const SHAPES: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
const PARTICLE_COUNT = 12;

export default function ClickParticles({ clickPosition, onAnimationComplete }: ClickParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!clickPosition) return;

    // Create new particles
    const newParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
      const speed = 5 + Math.random() * 3;
      
      return {
        id: Date.now() + i,
        x: clickPosition.x,
        y: clickPosition.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        size: 30 + Math.random() * 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
        life: 1,
      };
    });

    setParticles(newParticles);

    // Animate particles
    let animationFrame: number;
    const startTime = Date.now();
    const duration = 1000; // 1 second animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setParticles([]);
        onAnimationComplete();
        return;
      }

      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.2, // Gravity
          rotation: particle.rotation + particle.rotationSpeed,
          opacity: 1 - progress,
          life: 1 - progress,
        }))
      );

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [clickPosition, onAnimationComplete]);

  const renderShape = (particle: Particle) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
      transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.life})`,
      pointerEvents: 'none' as const,
    };

    switch (particle.shape) {
      case 'circle':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              backgroundColor: particle.color,
            }}
          />
        );
      case 'square':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              backgroundColor: particle.color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${particle.size / 2}px solid transparent`,
              borderRight: `${particle.size / 2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
            }}
          />
        );
    }
  };

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(renderShape)}
    </div>
  );
}
