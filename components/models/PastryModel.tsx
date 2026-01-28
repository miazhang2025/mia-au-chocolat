'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import { Pastry } from '@/types/pastry';
import { INTERACTION_CONFIG } from '@/utils/constants';
import * as THREE from 'three';

interface PastryModelProps {
  pastry: Pastry;
  onClick: () => void;
}

export default function PastryModel({ pastry, onClick }: PastryModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        pastry.position[1] + Math.sin(state.clock.elapsedTime + pastry.position[0]) * 0.05;
    }
  });

  const renderGeometry = () => {
    switch (pastry.modelType) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={pastry.position}
      rotation={pastry.rotation || [0, 0, 0]}
      scale={pastry.scale || 1}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {renderGeometry()}
      <meshStandardMaterial
        color={hovered ? '#ffcc80' : '#d4a574'}
        roughness={0.3}
        metalness={0.2}
      />
      {hovered && (
        <Outlines
          thickness={INTERACTION_CONFIG.HOVER_OUTLINE_THICKNESS}
          color={INTERACTION_CONFIG.HOVER_OUTLINE_COLOR}
        />
      )}
    </mesh>
  );
}
